export default function QuoteDoc({ template }) {

  return (
    <div
      style={{ maxHeight: "600px", overflow: "auto", background: "#fff", padding: "20px" }}
      dangerouslySetInnerHTML={{ __html: template || "" }}
    ></div>
  );
}
