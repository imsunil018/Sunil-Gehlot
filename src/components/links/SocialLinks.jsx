import {
  SiX,
  SiGithub,
  SiInstagram,
  SiTelegram,
  SiDiscord,
  SiFiverr,
} from "react-icons/si";
import { Linkedin, Mail } from "lucide-react";
import { SocialCard } from "./SocialCard";

const links = [
  {
    platform: "Twitter / X",
    handle: "@imsunil018",
    url: "https://x.com/imsunil018",
    Icon: SiX,
    color: "linear-gradient(135deg, #1a1a1a 0%, #333 100%)",
    glowColor: "rgba(255,255,255,0.07)",
  },
  {
    platform: "LinkedIn",
    handle: "linkedin.com/in/imsunil018",
    url: "https://www.linkedin.com/in/imsunil018",
    Icon: Linkedin,
    color: "linear-gradient(135deg, #0A66C2 0%, #0e80f0 100%)",
    glowColor: "rgba(10,102,194,0.20)",
  },
  {
    platform: "Discord",
    handle: "imsunil018",
    url: "https://discord.com/users/1450959869313159221",
    Icon: SiDiscord,
    color: "linear-gradient(135deg, #5865F2 0%, #7289da 100%)",
    glowColor: "rgba(88,101,242,0.20)",
  },
  {
    platform: "Instagram",
    handle: "@imsunil018",
    url: "https://instagram.com/imsunil018",
    Icon: SiInstagram,
    color: "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)",
    glowColor: "rgba(253,29,29,0.18)",
  },
  {
    platform: "Telegram",
    handle: "@imsunil018",
    url: "https://t.me/imsunil018",
    Icon: SiTelegram,
    color: "linear-gradient(135deg, #24A1DE 0%, #0088CC 100%)",
    glowColor: "rgba(36,161,222,0.20)",
  },
  {
    platform: "Email",
    handle: "imsunil018@gmail.com",
    url: "mailto:imsunil018@gmail.com?subject=Contact from Portfolio&body=Hi Sunil!",
    Icon: Mail,
    color: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
    glowColor: "rgba(139,92,246,0.20)",
  },
  {
    platform: "GitHub",
    handle: "@imsunil018",
    url: "https://github.com/imsunil018",
    Icon: SiGithub,
    color: "linear-gradient(135deg, #24292e 0%, #40474f 100%)",
    glowColor: "rgba(255,255,255,0.07)",
  },
  {
    platform: "Fiverr",
    handle: "fiverr.com/imsunil018",
    url: "https://www.fiverr.com/imsunil018",
    Icon: SiFiverr,
    color: "linear-gradient(135deg, #1DBF73 0%, #19a463 100%)",
    glowColor: "rgba(29,191,115,0.20)",
  },
];

export function SocialLinks() {
  return (
    <div className="w-full flex flex-col gap-3">
      {links.map((link, index) => (
        <SocialCard key={link.platform} {...link} index={index} />
      ))}
    </div>
  );
}
