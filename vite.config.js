import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const port = Number(process.env.PORT) || 5173;
const basePath = process.env.BASE_PATH || "/";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: basePath,
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "api-contact-middleware",
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url.startsWith("/api/contact") && req.method === "POST") {
              let body = "";
              req.on("data", (chunk) => {
                body += chunk.toString();
              });
              req.on("end", async () => {
                try {
                  const { name, email, subject, project_category, budget_scale, message } = JSON.parse(body);
                  
                  const apiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY;
                  if (!apiKey) {
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ success: false, message: "Resend API Key is missing on the local server." }));
                    return;
                  }

                  const resendResponse = await fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                      "Authorization": `Bearer ${apiKey}`,
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      from: "Sunil Gehlot Portfolio <onboarding@resend.dev>",
                      to: "imsunil018@gmail.com",
                      subject: subject || `New portfolio message from ${name}`,
                      html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Project Inquiry</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #fafafa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fafafa; padding: 40px 16px;">
      <tr>
        <td align="center">
          <!-- Outer Shadow Card Wrapper -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);">
            
            <!-- Brand Accent Gradient Strip -->
            <tr>
              <td height="4" style="background: linear-gradient(to right, #8b5cf6, #06b6d4); font-size: 0; line-height: 0; padding: 0; margin: 0;">&nbsp;</td>
            </tr>

            <!-- Header Section -->
            <tr>
              <td style="background-color: #0f172a; padding: 36px 40px; text-align: left;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td>
                      <div style="font-family: Menlo, Monaco, Consolas, 'Courier New', monospace; font-size: 10px; font-weight: 700; color: #a5b4fc; letter-spacing: 2.5px; text-transform: uppercase; margin-bottom: 6px;">
                        Sunil Gehlot · Portfolio
                      </div>
                      <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.75px;">
                        New Project Brief
                      </h1>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Body Section -->
            <tr>
              <td style="padding: 40px; background-color: #ffffff;">
                <p style="margin: 0 0 28px 0; font-size: 15px; line-height: 22px; color: #4b5563;">
                  Hello Sunil, you've received a new project brief from your portfolio contact form. Here are the submission details:
                </p>

                <!-- Details Card Box -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff; border-collapse: collapse; margin-bottom: 32px;">
                  <!-- Row 1: Client Name -->
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 16px 0; width: 35%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">
                      Client Name
                    </td>
                    <td style="padding: 16px 0; font-size: 14px; font-weight: 700; color: #0f172a; vertical-align: top;">
                      ${name}
                    </td>
                  </tr>

                  <!-- Row 2: Client Email -->
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 16px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">
                      Email Address
                    </td>
                    <td style="padding: 16px 0; font-size: 14px; font-weight: 650; color: #4f46e5; vertical-align: top;">
                      <a href="mailto:${email}" style="color: #4f46e5; text-decoration: none;">${email}</a>
                    </td>
                  </tr>

                  <!-- Row 3: Project Category -->
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 16px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">
                      Project Type
                    </td>
                    <td style="padding: 16px 0; font-size: 14px; color: #1e293b; font-weight: 500; vertical-align: top;">
                      ${project_category || "Not specified"}
                    </td>
                  </tr>

                  <!-- Row 4: Budget Scale -->
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 16px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">
                      Estimated Budget
                    </td>
                    <td style="padding: 16px 0; font-size: 14px; font-weight: 700; color: #10b981; vertical-align: top;">
                      ${budget_scale || "Not specified"}
                    </td>
                  </tr>

                  <!-- Row 5: Subject -->
                  <tr>
                    <td style="padding: 16px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">
                      Subject
                    </td>
                    <td style="padding: 16px 0; font-size: 14px; color: #0f172a; vertical-align: top; font-weight: 600;">
                      ${subject}
                    </td>
                  </tr>
                </table>

                <!-- Message Section -->
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 9px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">
                  Project Details / Message
                </div>
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border-left: 4px solid #8b5cf6; border-radius: 4px; margin-bottom: 40px;">
                  <tr>
                    <td style="padding: 24px;">
                      <div style="font-size: 14.5px; line-height: 1.6; color: #334155; font-style: italic; white-space: pre-wrap; font-family: Georgia, serif;">
                        "${message}"
                      </div>
                    </td>
                  </tr>
                </table>

                <!-- Action Button -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="center">
                      <a href="mailto:${email}?subject=Re:%20${subject}" style="display: inline-block; background-color: #0f172a; color: #ffffff; font-size: 14px; font-weight: 700; text-decoration: none; padding: 14px 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15); border: 1px solid #0f172a;">
                        Reply to Client &rarr;
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer Section -->
            <tr>
              <td style="background-color: #f8fafc; padding: 24px 40px; border-top: 1px solid #f1f5f9; text-align: center;">
                <p style="margin: 0; font-size: 11px; line-height: 16px; color: #94a3b8; font-family: Menlo, Monaco, Consolas, 'Courier New', monospace; letter-spacing: 0.5px;">
                  This notification was auto-generated by the Sunil Gehlot Portfolio Server.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
        `,
                    }),
                  });

                  const result = await resendResponse.json();
                  if (resendResponse.ok) {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ success: true, data: result }));
                  } else {
                    res.writeHead(resendResponse.status, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ success: false, message: result.message || "Resend submission failed." }));
                  }
                } catch (error) {
                  res.writeHead(500, { "Content-Type": "application/json" });
                  res.end(JSON.stringify({ success: false, message: error.message }));
                }
              });
            } else {
              next();
            }
          });
        }
      }
    ],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "src"),
      },
      dedupe: ["react", "react-dom"],
    },
    root: path.resolve(import.meta.dirname),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist"),
      emptyOutDir: true,
    },
    server: {
      port,
      host: "0.0.0.0",
    },
    preview: {
      port,
      host: "0.0.0.0",
    },
  };
});

