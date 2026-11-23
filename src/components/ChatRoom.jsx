import { useEffect, useRef, useState } from "react";
import { auth, db, isFirebaseConfigured, loginWithGoogle, logout } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

const getChatErrorMessage = (error) => {
  switch (error?.code) {
    case "auth/unauthorized-domain":
      return "This website domain is not allowed in Firebase Authentication.";
    case "auth/operation-not-allowed":
      return "Google sign-in is not enabled in Firebase Authentication.";
    case "auth/popup-blocked":
      return "Your browser blocked the Google sign-in window. Allow pop-ups and try again.";
    case "permission-denied":
      return "Chat access was denied. Check the Firestore security rules.";
    default:
      return error?.message || "Something went wrong. Please try again.";
  }
};

export default function ChatRoom() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [authReady, setAuthReady] = useState(!isFirebaseConfigured);
  const [messagesLoading, setMessagesLoading] = useState(isFirebaseConfigured);
  const [isSending, setIsSending] = useState(false);
  const [isAuthPending, setIsAuthPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const messagesRef = useRef(null);

  useEffect(() => {
    if (!auth) return undefined;

    return onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setAuthReady(true);
      },
      (error) => {
        setErrorMessage(getChatErrorMessage(error));
        setAuthReady(true);
      },
    );
  }, []);

  useEffect(() => {
    if (!db) return undefined;

    const messagesQuery = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(100),
    );

    return onSnapshot(
      messagesQuery,
      (snapshot) => {
        setMessages(
          snapshot.docs
            .map((messageDoc) => ({ id: messageDoc.id, ...messageDoc.data() }))
            .reverse(),
        );
        setMessagesLoading(false);
      },
      (error) => {
        setErrorMessage(getChatErrorMessage(error));
        setMessagesLoading(false);
      },
    );
  }, []);

  useEffect(() => {
    const messagesElement = messagesRef.current;
    if (messagesElement) {
      messagesElement.scrollTop = messagesElement.scrollHeight;
    }
  }, [messages]);

  const handleGoogleLogin = async () => {
    setErrorMessage("");
    setIsAuthPending(true);
    try {
      await loginWithGoogle();
    } catch (error) {
      setErrorMessage(getChatErrorMessage(error));
    } finally {
      setIsAuthPending(false);
    }
  };

  const handleLogout = async () => {
    setErrorMessage("");
    setIsAuthPending(true);
    try {
      await logout();
    } catch (error) {
      setErrorMessage(getChatErrorMessage(error));
    } finally {
      setIsAuthPending(false);
    }
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    const text = message.trim();
    if (!text || !user || !db) return;

    setErrorMessage("");
    setIsSending(true);
    try {
      await addDoc(collection(db, "messages"), {
        text,
        uid: user.uid,
        displayName: user.displayName || user.email || "Google user",
        photoURL: user.photoURL || "",
        createdAt: serverTimestamp(),
      });
      setMessage("");
    } catch (error) {
      setErrorMessage(getChatErrorMessage(error));
    } finally {
      setIsSending(false);
    }
  };

  if (!isFirebaseConfigured) {
    return (
      <div className="chat-room">
        <p className="chat-status" role="status">
          Live chat needs Firebase setup. Add the Firebase web app settings to
          your local environment to enable Google sign-in and messaging.
        </p>
      </div>
    );
  }

  return (
    <div className="chat-room">
      {user && (
        <div className="chat-user-header">
          <div className="flex items-center gap-3">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt=""
                className="w-10 h-10 rounded-full"
              />
            )}
            <span className="text-white font-semibold">
              {user.displayName || user.email}
            </span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="chat-logout"
            disabled={isAuthPending}
          >
            {isAuthPending ? "Please wait..." : "Logout"}
          </button>
        </div>
      )}

      <div
        className="chat-messages"
        ref={messagesRef}
        aria-live="polite"
        aria-label="Live chat messages"
      >
        {messagesLoading ? (
          <p className="chat-status">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="chat-status">No messages yet. Start the conversation.</p>
        ) : (
          messages.map((msg) => {
            const isMine = msg.uid === user?.uid;

            return (
              <div
                key={msg.id}
                className={`chat-message ${isMine ? "is-mine" : ""}`}
              >
                {!isMine && msg.photoURL && (
                  <img src={msg.photoURL} alt="" className="chat-avatar" />
                )}
                <div className={`chat-bubble ${isMine ? "is-mine" : ""}`}>
                  <div className="text-xs opacity-70 mb-1">
                    {msg.displayName || "Google user"}
                  </div>
                  <div>{msg.text}</div>
                </div>
                {isMine && msg.photoURL && (
                  <img src={msg.photoURL} alt="" className="chat-avatar" />
                )}
              </div>
            );
          })
        )}
      </div>

      {errorMessage && (
        <p className="chat-error" role="alert">
          {errorMessage}
        </p>
      )}

      {!authReady ? (
        <p className="chat-status">Connecting to Google sign-in...</p>
      ) : user ? (
        <form onSubmit={handleSendMessage} className="chat-compose">
          <input
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Type a message..."
            className="chat-input"
            maxLength={1000}
            aria-label="Chat message"
            disabled={isSending}
          />
          <button
            type="submit"
            className="chat-send"
            disabled={isSending || !message.trim()}
          >
            {isSending ? "Sending..." : "Send"}
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="chat-login"
            disabled={isAuthPending}
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt=""
              className="w-5 h-5"
            />
            {isAuthPending ? "Signing in..." : "Login with Google"}
          </button>
          <p className="text-sm text-gray-400">
            Sign in with Google to send a message.
          </p>
        </div>
      )}
    </div>
  );
}
