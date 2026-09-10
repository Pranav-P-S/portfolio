export const PORTFOLIO_DATA = {
  hero: {
    name: "PRANAV PS",
    subtitle: "Robotics & Computer Vision Engineer",
    description: "Specializing in 3D Reconstruction, Reinforcement Learning, and Generative AI for Robotics. Building the next generation of spatial intelligence and autonomous systems.",
    contact: {
      email: "pranavps.mec@gmail.com",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      phone: "+91 9400499915"
    }
  },
  experience: [
    {
      id: "gadgeon-ft",
      role: "Robotics & Computer Vision Engineer",
      company: "Gadgeon",
      period: "July 2026 - Present",
      description: "Leading R&D and implementation in robotics and vision systems. Developing X-Ray Diagnostics using YOLO and Vision Transformers (ViTs). Engineering simulation environments in Isaac Sim and Isaac Lab with Reinforcement Learning (RL).",
      tags: ["Computer Vision", "ViTs", "YOLO", "Isaac Sim", "RL"]
    },
    {
      id: "gadgeon-intern",
      role: "AI/Robotics Intern",
      company: "Gadgeon",
      period: "Jan 2026 - June 2026",
      description: "Researched and built pipelines for 3D Reconstruction, Neural Radiance Fields (NeRFs), and Gaussian Splatting (GS). Explored Generative AI for 3D asset creation and integrated SLAM for robotic navigation.",
      tags: ["3D Reconstruction", "NeRFs", "Gaussian Splatting", "SLAM", "Generative 3D"]
    }
  ],
  projects: [
    {
      id: "xray-cv",
      title: "X-Ray Diagnostics CV",
      description: "Advanced medical imaging pipeline leveraging YOLO for anomaly detection and Vision Transformers (ViTs) for high-fidelity classification of X-ray scans.",
      tech: ["YOLO", "Vision Transformers", "PyTorch", "Python"],
    },
    {
      id: "isaac-rl",
      title: "Isaac Sim RL Environments",
      description: "Custom physics-based simulation environments built in Isaac Lab to train robotic agents using complex Reinforcement Learning algorithms.",
      tech: ["Isaac Sim", "Reinforcement Learning", "Omniverse", "Robotics"],
    },
    {
      id: "nerf-reconstruction",
      title: "Neural 3D Reconstruction",
      description: "Pipeline combining SLAM and Neural Radiance Fields (NeRFs) / Gaussian Splatting to instantly reconstruct 3D environments from 2D video feeds.",
      tech: ["NeRFs", "Gaussian Splatting", "SLAM", "Generative 3D"],
    },
    {
      id: "securevision",
      title: "SecureVision",
      description: "AI fire safety system mapping optimal evacuation routes using a precision camera grid and A* algorithm.",
      tech: ["Python", "Tensorflow", "Streamlit", "A*"],
    }
  ],
  skills: {
    marquee: [
      "COMPUTER VISION", "REINFORCEMENT LEARNING", "NEURAL RADIANCE FIELDS", "ISAAC SIM", "SLAM & NAVIGATION", "3D RECONSTRUCTION"
    ],
    technical: ["Python", "C++", "PyTorch", "TensorFlow", "Isaac Sim / Omniverse", "ROS2", "Vision Transformers (ViTs)", "YOLO", "NeRFs & Gaussian Splatting"],
    interests: ["Generative AI for 3D", "Autonomous Navigation (SLAM)", "Pipeline Optimisation", "Firmware Modeling"]
  },
  education: [
    {
      id: "btech",
      institution: "Govt. Model Engineering College",
      degree: "B.Tech CSE - 8.3 CGPA",
      year: "Class of 2026",
      details: "Pursuing Honours in CyberSecurity."
    }
  ],
  achievements: [
    {
      year: "2024",
      title: "Operations Head at FOSS MEC",
      description: "Coordinating coding bootcamps and fostering open-source development.",
      color: "#00f3ff"
    },
    {
      year: "2024",
      title: "1st Runner-up, HULT Prize",
      description: "Project CARBORICH - Social entrepreneurship competition.",
      color: "#b026ff"
    },
    {
      year: "2024",
      title: "Finalist, ScaleUP Medical Hackathon",
      description: "Developed innovative medical AI solutions.",
      color: "#00f3ff"
    },
    {
      year: "2023",
      title: "1st Place, MAGIC 2.0",
      description: "Secured first position in the premier hackathon.",
      color: "#b026ff"
    }
  ],
  references: [
    "Govt. Model Engineering College",
    "- Principal Dr. Mini MG",
    "- HOD Dr. Binu V P"
  ]
};
