import { Html, Head, Main, NextScript } from "next/document";

const NHtml = Html as any;
const NHead = Head as any;
const NMain = Main as any;
const NNextScript = NextScript as any;

export default function Document() {
  return (
    <NHtml lang="en">
      <NHead />
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <NMain />
        <NNextScript />
      </body>
    </NHtml>
  );
}
