import Image from 'next/image';
import Markdown from 'react-markdown';
import {Typography, TypographyProps} from '@/components/ui/typography';

export type SupportedBlock = {
  type: 'paragraph';
  text: string;
} | {
  type: 'heading';
  level: 2 | 3;
  text: string;
} | {
  type: 'blockquote';
  text: string;
} | {
  type: 'unordered-list';
  items: string[];
} | {
  type: 'ordered-list';
  items: string[];
} | {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
};

export interface BlocksViewProps {
  blocks?: SupportedBlock[];
}

export const typographyPropsByLevel: Record<2 | 3, TypographyProps> = {
  2: {
    as: 'h2',
    variant: 'heading2',
  },
  3: {
    as: 'h3',
    variant: 'heading3',
  }
}

export function  BlocksView({ blocks }: BlocksViewProps) {
  if (!blocks) {
    return null;
  }

  return <div className="flex flex-col gap-4 font-inter">
    {blocks.map((block: SupportedBlock, index: number) => {
      if (block.type === 'paragraph') {
        return <div key={`${block.type}-${index}`} className="font-inter text-md">
          <Markdown>{block.text}</Markdown>
        </div>;
      }
      
      if (block.type === 'heading') {
        const props = typographyPropsByLevel[block.level];
        return <Typography key={`${block.type}-${index}`} className="mt-4" {...props}>
          <Markdown>{block.text}</Markdown>
        </Typography>;
      }

      if (block.type === 'blockquote') {
        return <blockquote key={`${block.type}-${index}`}>
          <Markdown>{block.text}</Markdown>
        </blockquote>;
      }

      if (block.type === 'ordered-list') {
        return <ol key={`${block.type}-${index}`} className="flex flex-col gap-1 list-decimal ml-4">
          {block.items.map((listItem) => <li key={listItem}>
            <Markdown>{listItem}</Markdown>
            </li>)}
        </ol>;
      }

      if (block.type === 'unordered-list') {
        return <ul key={`${block.type}-${index}`} className="flex flex-col gap-1 list-disc ml-4">
          {block.items.map((listItem) =>
              <li key={listItem}>
                <Markdown>{listItem}</Markdown>
              </li>
            )}
        </ul>;
      }

      if (block.type === 'image' && block.src) {
        return <Image
          key={`${block.type}-${index}`}
          src={block.src}
          alt={block.alt}
          title={block.caption}
        />;
      }
    })}
  </div>
}
