import { useState } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import Lanyard from "./components/Lanyard/Lanyard";
import { listTools, listProyek, listEditing, listAchievements } from "./data";
import ChromaGrid from "./components/ChromaGrid/ChromaGrid";
import EditingGallery from "./components/EditingGallery/EditingGallery";
import AchievementMarquee from "./components/AchievementMarquee/AchievementMarquee";
import ProjectModal from "./components/ProjectModal/ProjectModal";
import Aurora from "./components/Aurora/Aurora";
import ChatRoom from "./components/ChatRoom";

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [contactStatus, setContactStatus] = useState(null);
  const [isSendingContact, setIsSendingContact] = useState(false);

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleAchievementClick = (achievement) => {
    setSelectedProject({
      ...achievement,
      backLabel: "Back to achievements",
    });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setContactStatus(null);
    setIsSendingContact(true);
    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/bayuadi00025@gmail.com",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
            _subject: "New message from your portfolio",
          }),
        },
      );
      const result = await response.json();

      if (
        !response.ok ||
        result.success === false ||
        result.success === "false"
      ) {
        throw new Error(result.message || "The email service rejected the message.");
      }

      form.reset();
      setContactStatus({
        type: "success",
        text: "Your message was sent. If this is the first submission, confirm the activation email from FormSubmit.",
      });
    } catch (error) {
      setContactStatus({
        type: "error",
        text:
          error instanceof Error
            ? `Message not sent: ${error.message}`
            : "Message not sent. Please try again later.",
      });
    } finally {
      setIsSendingContact(false);
    }
  };

  return (
    <>
      <div className="hero-aurora" aria-hidden="true">
        <Aurora
          colorStops={["#6D4BC3", "#267C8E", "#17254A"]}
          blend={0.45}
          amplitude={0.8}
          speed={0.35}
        />
      </div>

      <main className="site-main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy" data-aos="fade-up" data-aos-duration="700">
            <p className="eyebrow">
              <span className="eyebrow-dot" />
              Web developer · Creative editor
            </p>
            <h1 className="hero-title" id="hero-title">
              Hello, I&apos;m
              <br />
              <span className="hero-title-accent">Bayu Adi Saputra.</span>
            </h1>
            <p className="hero-description">
              I create useful digital experiences through web development, and
              bring ideas to life with photo and video editing.
            </p>
            <div className="hero-actions">
              <a
                href="/assets/Profesional Resume.pdf"
                download="Bayu_Adi_Saputra_CV.pdf"
                className="button-primary"
              >
                Download CV <span aria-hidden="true">↓</span>
              </a>
              <a href="#project" className="button-secondary">
                Explore my work <span aria-hidden="true">↘</span>
              </a>
            </div>
            <div className="hero-tags" aria-label="Areas of work">
              <span className="hero-tag">Web development</span>
              <span className="hero-tag">Photo editing</span>
              <span className="hero-tag">Video editing</span>
            </div>
          </div>

          <div className="hero-visual">
            <ProfileCard
              name="Bayu Adi Saputra"
              title="Web Developer & Creative Editor"
              handle="adibayu025"
              status="Open to opportunities"
              contactText="Contact me"
              avatarUrl="/assets/bayu.png"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              behindGradient="radial-gradient(circle at 50% 50%, rgba(167,139,250,.45), rgba(103,232,249,.18) 45%, transparent 75%)"
              innerGradient="linear-gradient(145deg, rgba(33,31,55,.94), rgba(10,14,24,.98))"
              onContactClick={scrollToContact}
            />
          </div>
        </section>

        <section className="section-block" id="about" aria-labelledby="about-title">
          <div className="about-card" data-aos="fade-up" data-aos-duration="700">
            <div>
              <p className="eyebrow">A little about me</p>
              <h2 className="about-title" id="about-title">
                Curious by nature. Creative by choice.
              </h2>
              <p className="about-copy">
                I&apos;m an Informatics graduate from Universitas Bina Sarana
                Informatika with a strong interest in technology and digital
                development. I enjoy learning new tools, building practical
                applications, and creating visual content. My experience
                includes developing a BUMDes Sukses Mandiri application and
                creating content with CapCut and Canva.
              </p>
              <div className="about-stats">
                <div className="about-stat">
                  <strong>1<span className="hero-title-accent">+</span></strong>
                  <span>Project completed</span>
                </div>
                <div className="about-stat">
                  <strong>100<span className="hero-title-accent">+</span></strong>
                  <span>Hours learning</span>
                </div>
                <div className="about-stat">
                  <strong>3.92<span className="hero-title-accent">/4</span></strong>
                  <span>GPA</span>
                </div>
              </div>
            </div>
            <div className="about-visual" aria-label="Interactive portfolio card">
              <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
            </div>
          </div>
        </section>

        <section className="section-block" id="tools" aria-labelledby="tools-title">
          <div className="section-heading">
            <p className="eyebrow">My toolkit</p>
            <h2 className="section-title" id="tools-title">Tools & technologies</h2>
            <p className="section-description">
              A selection of tools I use to build, design, and create.
            </p>
          </div>
          <div className="tools-box">
            {listTools.map((tool) => (
              <div className="tool-card" key={tool.id}>
                <img
                  src={tool.gambar}
                  alt={tool.nama}
                  className="tool-icon"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <div className="tool-name">{tool.nama}</div>
                  <p className="tool-description">{tool.ket}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          className="section-block project-section"
          id="project"
          aria-labelledby="projects-title"
        >
          <div className="section-heading">
            <p className="eyebrow">Selected work · 01</p>
            <h2 className="section-title" id="projects-title">Web projects</h2>
            <p className="section-description">
              Applications and websites built to solve real problems and make
              everyday experiences a little better.
            </p>
          </div>
          <div data-aos="fade-up" data-aos-duration="700">
            <ChromaGrid
              items={listProyek}
              onItemClick={setSelectedProject}
            />
          </div>
        </section>

        <section
          className="section-block editing-section"
          id="editing"
          aria-labelledby="editing-title"
        >
          <EditingGallery
            items={listEditing}
            onItemClick={setSelectedProject}
          />
        </section>

        <section
          className="section-block achievement-section"
          id="achievements"
          aria-labelledby="achievements-title"
        >
          <div className="section-heading">
            <p className="eyebrow">Learning & milestones</p>
            <h2 className="section-title" id="achievements-title">
              Achievements
            </h2>
            <p className="section-description">
              Certificates and milestones from my learning journey.
            </p>
          </div>
          <AchievementMarquee
            items={listAchievements}
            onItemClick={handleAchievementClick}
          />
        </section>

        <section
          className="section-block"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="section-heading centered">
            <p className="eyebrow">Have a project in mind?</p>
            <h2 className="section-title" id="contact-title">
              Let&apos;s make something meaningful.
            </h2>
            <p className="section-description">
              Get in touch, or say hello in the live chat.
            </p>
          </div>
          <div className="contact-grid">
            <div className="contact-panel">
              <h3 className="contact-panel-title">Live chat</h3>
              <ChatRoom />
            </div>
            <div className="contact-panel">
              <h3 className="contact-panel-title">Send me a message</h3>
              <form
                onSubmit={handleContactSubmit}
                className="contact-form"
                autoComplete="off"
              >
                <div className="form-field">
                  <label htmlFor="contact-name">Full name</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    placeholder="Your name"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="contact-email">Email address</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    placeholder="you@example.com"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    name="message"
                    id="message"
                    rows="5"
                    placeholder="Tell me a little about your project..."
                    className="form-input"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="button-primary contact-submit"
                  disabled={isSendingContact}
                >
                  {isSendingContact ? "Sending..." : "Send message"}{" "}
                  <span aria-hidden="true">↗</span>
                </button>
                {contactStatus && (
                  <p
                    className={`form-status is-${contactStatus.type}`}
                    role="status"
                  >
                    {contactStatus.text}
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
        project={selectedProject}
        backLabel={
          selectedProject?.backLabel ||
          (selectedProject?.media?.length ? "Back to gallery" : "Back to projects")
        }
      />
    </>
  );
}

export default App;
