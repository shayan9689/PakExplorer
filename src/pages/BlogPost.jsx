import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, Calendar, Tag, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data';

function PageWrapper({ children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {children}
    </motion.div>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);
  const related = blogPosts.filter(p => p.slug !== slug).slice(0, 3);

  if (!post) {
    return (
      <PageWrapper>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-white text-2xl font-bold mb-4">Article Not Found</h2>
            <Link to="/blog" className="btn-primary">Back to Blog</Link>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,14,28,0.3), rgba(8,14,28,0.92))' }} />
        <div className="absolute top-24 left-0 right-0 px-4 sm:px-8 max-w-4xl mx-auto">
          <Link to="/blog" className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
            <ArrowLeft size={15} /> Back to Blog
          </Link>
        </div>
        <div className="absolute bottom-0 px-4 sm:px-8 pb-10 max-w-4xl mx-auto left-0 right-0">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
            <span className="badge badge-emerald mb-4">{post.category}</span>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-5 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <img src={post.authorImage} alt={post.author} className="w-8 h-8 rounded-full object-cover" />
                <span>{post.author}</span>
              </div>
              <span className="flex items-center gap-1.5"><Calendar size={13} />{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span className="flex items-center gap-1.5"><Clock size={13} />{post.readTime}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
          <p className="text-gray-300 text-xl leading-relaxed mb-8 font-medium border-l-4 border-emerald-500 pl-5 italic">
            {post.excerpt}
          </p>

          <div className="prose prose-invert max-w-none">
            {post.content.split('\n\n').map((para, i) => (
              para.startsWith('**') && para.endsWith('**')
                ? <h3 key={i} className="font-display text-2xl font-bold text-white mt-10 mb-4">{para.replace(/\*\*/g, '')}</h3>
                : <p key={i} className="text-gray-400 leading-relaxed mb-5 text-base">{para}</p>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-[#1e2d4a] flex flex-wrap items-center gap-3">
            <span className="text-gray-400 text-sm flex items-center gap-1.5"><Tag size={14} />Tags:</span>
            {post.tags.map(tag => (
              <span key={tag} className="badge badge-blue">{tag}</span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Related Posts */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h3 className="text-white font-bold text-2xl mb-8">More Articles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {related.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link to={`/blog/${p.slug}`}>
                <div className="destination-card group">
                  <div className="relative h-44 overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                    <div className="card-overlay" />
                    <div className="absolute top-3 left-3"><span className="badge badge-emerald text-xs">{p.category}</span></div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-white font-bold text-sm leading-snug mb-1 group-hover:text-emerald-400 transition-colors line-clamp-2">{p.title}</h4>
                    <span className="flex items-center gap-1 text-emerald-400 text-xs font-semibold mt-2">Read More <ArrowRight size={11} /></span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
