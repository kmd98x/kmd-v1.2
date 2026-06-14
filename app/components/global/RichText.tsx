const MARKUP_PATTERN = /(\*\*.*?\*\*|\[[^\]]+\]\([^)]+\))/g;
const LINK_PATTERN = /^\[([^\]]+)\]\(([^)]+)\)$/;

function isExternalUrl(url: string) {
    return /^https?:\/\//i.test(url) || url.startsWith("//");
}

function renderPart(part: string, key: number) {
    if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={key}>{part.slice(2, -2)}</strong>;
    }

    const linkMatch = part.match(LINK_PATTERN);
    if (linkMatch) {
        const [, label, url] = linkMatch;
        const external = isExternalUrl(url);

        return (
            <a
                key={key}
                href={url}
                className="underline"
                {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
            >
                {label}
            </a>
        );
    }

    return part;
}

export default function RichText({ text, className }: { text: string; className?: string; }) {
    const parts = text.split(MARKUP_PATTERN);

    return (
        <p className={className}>
            {parts.map((part, i) => renderPart(part, i))}
        </p>
    );
}