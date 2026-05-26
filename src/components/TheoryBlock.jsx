export default function TheoryBlock({ content }) {
  const paragraphs = content.split("\n\n");

  return (
    <div className="theory-block">
      {paragraphs.map((para, i) => {
        const html = para
          .replace(/\*\*(.*?)\*\*/g, '<strong class="theory-bold">$1</strong>')
          .replace(
            /`(.*?)`/g,
            '<code class="theory-code">$1</code>'
          )
          .replace(
            /• (.*)/g,
            '<div class="theory-bullet"><span class="bullet-dot">▸</span><span>$1</span></div>'
          )
          .replace(/\n/g, "<br/>");

        return (
          <p
            key={i}
            className="theory-para"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      })}
    </div>
  );
}
