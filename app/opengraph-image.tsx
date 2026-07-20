import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Βαπτίζεται ο George · 12 Σεπτεμβρίου 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function toDataUri(relativePath: string) {
  const data = await readFile(join(process.cwd(), "public", relativePath));
  return `data:image/png;base64,${data.toString("base64")}`;
}

export default async function Image() {
  const [brittany, babyPhoto, donut, muffin] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/BrittanySignatureScript.ttf")),
    toDataUri("babyNew.png"),
    toDataUri("donut.png"),
    toDataUri("muffin.png"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundImage: "linear-gradient(135deg, #e9dcc8 0%, #cdb99f 100%)",
        }}
      >
        <img
          src={donut}
          alt=""
          width={92}
          height={50}
          style={{
            position: "absolute",
            top: 52,
            left: 64,
            opacity: 0.55,
            transform: "rotate(-14deg)",
          }}
        />
        <img
          src={muffin}
          alt=""
          width={84}
          height={46}
          style={{
            position: "absolute",
            bottom: 60,
            left: 140,
            opacity: 0.5,
            transform: "rotate(10deg)",
          }}
        />
        <img
          src={donut}
          alt=""
          width={64}
          height={35}
          style={{
            position: "absolute",
            top: 68,
            right: 440,
            opacity: 0.4,
            transform: "rotate(18deg)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 460,
            height: "100%",
            padding: "0 20px",
          }}
        >
          <img
            src={babyPhoto}
            alt=""
            width={420}
            height={420}
            style={{
              objectFit: "cover",
              borderRadius: 28,
              border: "6px solid #f6ecdc",
              boxShadow: "0 18px 40px rgba(60,45,25,0.25)",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            paddingRight: 64,
          }}
        >
          <span
            style={{
              fontFamily: "sans-serif",
              fontSize: 22,
              letterSpacing: 6,
              color: "#6b5b45",
            }}
          >
            ΣΑΣ ΠΡΟΣΚΑΛΟΥΜΕ ΣΤΗ ΒΑΠΤΙΣΗ ΜΟΥ
          </span>
          <span
            style={{
              fontFamily: "Brittany",
              fontSize: 118,
              color: "#4a3f33",
              lineHeight: 1.05,
              marginTop: 46,
            }}
          >
            Baptism Day
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginTop: 22,
            }}
          >
            <div style={{ width: 56, height: 2, backgroundColor: "#a37b4c" }} />
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 8,
                backgroundColor: "#a37b4c",
              }}
            />
            <div style={{ width: 56, height: 2, backgroundColor: "#a37b4c" }} />
          </div>
          <span
            style={{
              fontFamily: "sans-serif",
              fontSize: 32,
              color: "#4a3f33",
              marginTop: 22,
            }}
          >
            12 Σεπτεμβρίου 2026
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Brittany", data: brittany, style: "normal", weight: 400 }],
    },
  );
}
