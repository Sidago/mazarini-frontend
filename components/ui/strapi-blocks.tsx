import React from "react";

// Minimal Strapi Blocks (rich text) renderer.
// Covers the node types Strapi v5 emits: paragraph, heading, list, list-item,
// quote, code, link, image, and inline marks (bold, italic, underline, etc.).

type InlineChild = {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
};

type LinkNode = {
  type: "link";
  url: string;
  children: InlineChild[];
};

type InlineNode = InlineChild | LinkNode;

type BlockNode =
  | { type: "paragraph"; children: InlineNode[] }
  | { type: "heading"; level: 1 | 2 | 3 | 4 | 5 | 6; children: InlineNode[] }
  | { type: "list"; format: "ordered" | "unordered"; children: ListItemNode[] }
  | { type: "quote"; children: InlineNode[] }
  | { type: "code"; plainText?: string; children: InlineNode[] }
  | { type: "image"; image: { url: string; alternativeText?: string }; children?: InlineNode[] };

type ListItemNode = { type: "list-item"; children: InlineNode[] };

function renderInline(nodes: InlineNode[], keyPrefix: string): React.ReactNode[] {
  return nodes.map((node, i) => {
    const key = `${keyPrefix}-${i}`;
    if (node.type === "link") {
      return (
        <a key={key} href={node.url} className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">
          {renderInline(node.children, key)}
        </a>
      );
    }
    let el: React.ReactNode = node.text;
    if (node.bold) el = <strong key={key}>{el}</strong>;
    if (node.italic) el = <em key={key}>{el}</em>;
    if (node.underline) el = <u key={key}>{el}</u>;
    if (node.strikethrough) el = <s key={key}>{el}</s>;
    if (node.code) el = <code key={key} className="px-1 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 font-mono text-sm">{el}</code>;
    return <React.Fragment key={key}>{el}</React.Fragment>;
  });
}

function renderBlock(block: BlockNode, index: number): React.ReactNode {
  const key = `block-${index}`;
  switch (block.type) {
    case "paragraph":
      return (
        <p key={key} className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {renderInline(block.children, key)}
        </p>
      );
    case "heading": {
      const Tag = `h${block.level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
      const sizeMap: Record<number, string> = {
        1: "text-4xl",
        2: "text-3xl",
        3: "text-2xl",
        4: "text-xl",
        5: "text-lg",
        6: "text-base",
      };
      return (
        <Tag key={key} className={`${sizeMap[block.level]} font-bold text-neutral-900 dark:text-white mt-6 mb-2`}>
          {renderInline(block.children, key)}
        </Tag>
      );
    }
    case "list": {
      const Tag = block.format === "ordered" ? "ol" : "ul";
      return (
        <Tag key={key} className={`${block.format === "ordered" ? "list-decimal" : "list-disc"} pl-6 space-y-1`}>
          {block.children.map((item, i) => (
            <li key={`${key}-li-${i}`} className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {renderInline(item.children, `${key}-li-${i}`)}
            </li>
          ))}
        </Tag>
      );
    }
    case "quote":
      return (
        <blockquote key={key} className="border-l-4 border-primary pl-4 italic text-neutral-500 dark:text-neutral-400">
          {renderInline(block.children, key)}
        </blockquote>
      );
    case "code":
      return (
        <pre key={key} className="rounded bg-neutral-100 dark:bg-neutral-800 p-4 overflow-x-auto text-sm font-mono">
          <code>{block.plainText ?? renderInline(block.children, key)}</code>
        </pre>
      );
    default:
      return null;
  }
}

interface StrapiBlocksProps {
  content: unknown;
  className?: string;
}

export function StrapiBlocks({ content, className }: StrapiBlocksProps): React.ReactElement | null {
  if (!Array.isArray(content) || content.length === 0) return null;
  return (
    <div className={`space-y-4 ${className ?? ""}`}>
      {(content as BlockNode[]).map((block, i) => renderBlock(block, i))}
    </div>
  );
}
