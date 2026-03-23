import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { ContentBlock } from "@/hooks/usePageContent";
import { iconMap } from "@/lib/icons";

interface Props {
  block: ContentBlock;
  index?: number;
}

export const TextBlock = ({ block }: Props) => {
  const { t } = useLanguage();
  const content = t(block.content_fr, block.content_en);
  const variant = block.metadata?.variant;

  if (variant === "badge") {
    return <p className="text-accent font-medium mb-4 tracking-wider text-sm uppercase">{content}</p>;
  }
  if (variant === "heading") {
    return <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">{content}</h2>;
  }
  return <p className="text-muted-foreground leading-relaxed mb-4">{content}</p>;
};

export const ImageBlock = ({ block }: Props) => {
  const alt = block.metadata?.alt || "";
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
      <img src={block.media_url || ""} alt={alt} className="w-full rounded-2xl object-cover" />
    </motion.div>
  );
};

export const VideoBlock = ({ block }: Props) => {
  return (
    <div className="aspect-video rounded-2xl overflow-hidden">
      <iframe src={block.media_url || ""} className="w-full h-full" allowFullScreen title="Video" />
    </div>
  );
};

export const StatBlock = ({ block }: Props) => {
  const { lang } = useLanguage();
  const label = lang === "en" ? block.metadata?.label_en : block.metadata?.label_fr;
  const Icon = iconMap[block.metadata?.icon] || Star;
  const content = block.content_fr; // stats are language-agnostic numbers

  return (
    <div className="text-center p-4">
      <Icon className="h-6 w-6 text-accent mx-auto mb-3" />
      <p className="text-3xl font-heading font-bold text-foreground">{content}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
};

export const TestimonialBlock = ({ block }: Props) => {
  const { t, lang } = useLanguage();
  const quote = t(block.content_fr, block.content_en);
  const role = lang === "en" ? block.metadata?.role_en : block.metadata?.role_fr;

  return (
    <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star key={s} className="h-4 w-4 text-accent fill-accent" />
        ))}
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed mb-6">"{quote}"</p>
      <div>
        <p className="font-heading font-semibold text-foreground text-sm">{block.metadata?.name}</p>
        <p className="text-xs text-muted-foreground">{role}</p>
      </div>
    </div>
  );
};

export const CardBlock = ({ block, index = 0 }: Props) => {
  const { t, lang } = useLanguage();
  const title = lang === "en" ? block.metadata?.title_en : block.metadata?.title_fr;
  const content = t(block.content_fr, block.content_en);
  const tag = lang === "en" ? block.metadata?.tag_en : block.metadata?.tag_fr;
  const Icon = iconMap[block.metadata?.icon] || CheckCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group bg-card rounded-2xl p-8 shadow-card border border-border hover:shadow-elevated hover:border-accent/30 transition-all duration-300 flex flex-col"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
          <Icon className="h-6 w-6 text-accent" />
        </div>
        {tag && <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">{tag}</span>}
      </div>
      {title && <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{title}</h3>}
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{content}</p>
      {block.metadata?.link && (
        <div className="mt-6">
          <Button asChild size="sm" variant="ghost" className="text-accent hover:text-accent px-0">
            <Link to={block.metadata.link}>{lang === "en" ? "Learn More" : "En Savoir Plus"} <ArrowRight className="h-3.5 w-3.5" /></Link>
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export const TeamMemberBlock = ({ block, index = 0 }: Props) => {
  const { lang } = useLanguage();
  const role = lang === "en" ? block.metadata?.role_en : block.metadata?.role_fr;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-card rounded-2xl p-8 shadow-card border border-border text-center group hover:shadow-elevated transition-all duration-300"
    >
      {block.media_url ? (
        <img src={block.media_url} alt={block.metadata?.name} className="h-20 w-20 rounded-full object-cover mx-auto mb-4" />
      ) : (
        <div className="h-20 w-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
          <span className="text-accent font-heading font-bold text-xl">{block.metadata?.initials}</span>
        </div>
      )}
      <h3 className="font-heading font-semibold text-foreground">{block.metadata?.name}</h3>
      <p className="text-sm text-muted-foreground mt-1">{role}</p>
    </motion.div>
  );
};

export const CtaBlock = ({ block }: Props) => {
  const { t } = useLanguage();
  const content = t(block.content_fr, block.content_en);
  const variant = block.metadata?.variant;

  if (variant === "outline") {
    return (
      <Button asChild variant="hero-outline" size="xl">
        <Link to={block.metadata?.link || "/"}>{content}</Link>
      </Button>
    );
  }
  return (
    <Button asChild variant="hero" size="xl">
      <Link to={block.metadata?.link || "/contact"}>
        {content}
        <ArrowRight className="h-5 w-5" />
      </Link>
    </Button>
  );
};

export const FeatureListBlock = ({ block }: Props) => {
  const { lang } = useLanguage();
  const items = lang === "en" ? block.metadata?.items_en : block.metadata?.items_fr;
  if (!items || !Array.isArray(items)) return null;

  return (
    <ul className="space-y-3 mb-4">
      {items.map((item: string) => (
        <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
          <CheckCircle className="h-4 w-4 text-accent shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
};

export const ContactInfoBlock = ({ block }: Props) => {
  const { lang } = useLanguage();
  const label = lang === "en" ? block.metadata?.label_en : block.metadata?.label_fr;
  const content = lang === "en" ? (block.content_en || block.content_fr) : (block.content_fr || block.content_en);
  const Icon = iconMap[block.metadata?.icon] || CheckCircle;

  return (
    <div className="flex items-start gap-4">
      <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5 text-accent" />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground">{content}</p>
      </div>
    </div>
  );
};

const blockComponents: Record<string, React.ComponentType<Props>> = {
  text: TextBlock,
  image: ImageBlock,
  video: VideoBlock,
  stat: StatBlock,
  testimonial: TestimonialBlock,
  card: CardBlock,
  team_member: TeamMemberBlock,
  cta: CtaBlock,
  feature_list: FeatureListBlock,
  contact_info: ContactInfoBlock,
};

export const BlockRenderer = ({ block, index = 0 }: Props) => {
  const Component = blockComponents[block.block_type] || TextBlock;
  return <Component block={block} index={index} />;
};

export default BlockRenderer;
