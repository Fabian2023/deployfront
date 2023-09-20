import React from "react";
import "../About/About.css";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const About = () => {
  const programmers = [
    {
      name: "Miguel Gorriti",
      image: "https://avatars.githubusercontent.com/u/128431530?v=4",
      socialMedia: {
        github: "https://github.com/MiGorriti",
        linkedin: "https://www.linkedin.com/in/miguel-gorriti-555393205/",
      },
    },
    {
      name: "Fabian Salcedo",
      image: "https://avatars.githubusercontent.com/u/117929534?v=4",
      socialMedia: {
        github: "https://github.com/Fabian2023",
        linkedin: "LINK_LINKEDIN_2",
      },
    },
    {
      name: "Santiago Ramirez",
      image: "https://avatars.githubusercontent.com/u/128662221?v=4",
      socialMedia: {
        github: "https://github.com/SantiagoRC31",
        linkedin: "LINK_LINKEDIN_3",
      },
    },
    {
      name: "Lorenzo Santos",
      image: "https://avatars.githubusercontent.com/u/119063320?v=4",
      socialMedia: {
        github: "https://github.com/AbareKiller100",
        linkedin: "https://www.linkedin.com/in/lorenzo-santos-34a109267/",
      },
    },
    {
      name: "Omar Sampayo",
      image:
        "https://media.licdn.com/dms/image/D4E35AQEueJ3jGV71EA/profile-framedphoto-shrink_400_400/0/1687377709215?e=1695330000&v=beta&t=BQhhsXMe5O2QPkepaSftlt6TWexUaJpL2JNL0-pRejg",
      socialMedia: {
        github: "https://github.com/Omarx32",
        linkedin: "https://www.linkedin.com/in/omarx32/",
      },
    },
    {
      name: "Chirstian Barrera ",
      image: "https://avatars.githubusercontent.com/u/71193472?v=4",
      socialMedia: {
        github: "https://github.com/camilobr89",
        linkedin: "https://www.linkedin.com/in/chirstian-barrera/",
      },
    },
    {
      name: "Mateo Chavez",
      image:
        "https://media.licdn.com/dms/image/C4D03AQG7kMcMV1-yoA/profile-displayphoto-shrink_400_400/0/1664221763415?e=1700697600&v=beta&t=gxjgoL87eE3hqsX3Rc7TEXKkgKeGagkD7kYMqhvgyzI",
      socialMedia: {
        github: "https://github.com/Mateoch14",
        linkedin: "https://www.linkedin.com/in/mateo-chavez/",
      },
    },
  ];

  return (
    <div>
      <h2 className="header-sec">Desarrolladores</h2>
      <div className="programmers-list">
        {programmers.map((programmer, index) => (
          <div key={index} className="programmer-card">
            <img
              className="fotito"
              src={programmer.image}
              alt={programmer.name}
            />
            <h2>{programmer.name}</h2>
            <div className="social-media-links">
              <a href={programmer.socialMedia.github} target="_blank">
                <FaGithub />
              </a>
              <a href={programmer.socialMedia.linkedin} target="_blank">
                <FaLinkedin />
              </a>
            </div>
          </div>
        ))}
      </div>
      <Link to="/Home" className="Boton">
        Home
      </Link>
    </div>
  );
};

export default About;
