import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getAllNewsItems, getNewsItemBySlug } from '@/lib/contentful';
import { NewsItem } from '@/app/types';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Layout from '@/app/components/layout/Layout';
import Link from 'next/link';
import { FiArrowLeft, FiClock, FiCalendar, FiArrowRight } from 'react-icons/fi';
import ShareButtons from '@/app/components/ShareButtons';

async function getPostData(slug: string) {
  const [post, allPosts] = await Promise.all([
    getNewsItemBySlug(slug),
    getAllNewsItems()
  ]);

  if (!post) {
    notFound();
  }

  return { post, allPosts };
}

export async function generateMetadata({ params: paramsPromise }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await paramsPromise;
  const { post } = await getPostData(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Pittachara Updates`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.imageUrl ? [{
        url: post.imageUrl.startsWith('http') ? post.imageUrl : `https:${post.imageUrl}`,
        width: 1200,
        height: 630,
        alt: post.alt || post.title,
      }] : [],
    },
  };
}

export default async function NewsPostPage({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const params = await paramsPromise;
  console.log('Rendering post with slug:', params.slug);
  const { post, allPosts } = await getPostData(params.slug);
  
  console.log('Post data:', {
    id: post.id,
    title: post.title,
    slug: post.slug,
    receivedSlug: params.slug
  });

  // Get related posts (exclude current post)
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id)
    .slice(0, 3); // Show max 3 related posts

  return (
    <Layout>
      {/* Back Button */}


      {/* Hero Section */}
      <section className="relative font-geograph bg-gradient-to-r from-gray-50 to-gray-100 py-16 md:pt-24 md:pb-6">
        <div className="absolute inset-0 bg-white/30" aria-hidden="true"></div>
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
           
            <h1 className="text-3xl font-larken md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center text-gray-600 text-sm gap-4">
              <div className="flex items-center">
                <FiCalendar className="mr-1.5 text-[#f6b417]" />
                <span>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
              <div className="flex items-center">
                <FiClock className="mr-1.5 text-[#f6b417]" />
                <span>5 min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.imageUrl && (
        <section className="py-8 md:pt-12 md:pb-6">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-video  overflow-hidden shadow-lg border border-gray-100">
                <Image
                  src={post.imageUrl.startsWith('http') ? post.imageUrl : `https:${post.imageUrl}`}
                  alt={post.alt || post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl font-geograph mx-auto prose prose-lg prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-[#f6b417] hover:prose-a:text-[#e0a416] prose-strong:text-gray-900 prose-blockquote:border-l-[#f6b417] prose-blockquote:text-gray-600">
            {post.content && documentToReactComponents(post.content, {
              renderNode: {
                'heading-1': (node, children) => <h1 className="text-3xl font-bold mt-10 mb-6">{children}</h1>,
                'heading-2': (node, children) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
                'heading-3': (node, children) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
                'paragraph': (node, children) => <p className="mb-6 leading-relaxed">{children}</p>,
                'embedded-asset-block': (node) => {
                  // Handle embedded assets (images)
                  const { url, details } = node.data.target.fields.file;
                  const imageUrl = url.startsWith('http') ? url : `https:${url}`;
                  const alt = node.data.target.fields.description || 'Content image';
                  
                  return (
                    <div className="my-8">
                      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        <Image
                          src={imageUrl}
                          alt={alt}
                          fill
                          className="object-cover "
                        />
                      </div>
                      {alt && alt !== 'Content image' && (
                        <p className="mt-2 text-sm text-gray-500 text-center">{alt}</p>
                      )}
                    </div>
                  );
                },
                'embedded-entry-block': (node) => {
                  // Handle embedded entries (if any)
                  return <div className="my-8">{/* Render embedded entry */}</div>;
                },
              },
            })}
          </div>
        </div>
      </section>

      {/* Share Section */}
      <section className="py-8 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-gray-700 font-medium">Share this article:</div>
            <ShareButtons title={post.title} slug={post.slug} />
          </div>
        </div>
      </section>

      {/* More Updates Section */}
      {relatedPosts.length > 0 && (
        <section className="py-16 font-geograph bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  More Updates
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Explore more stories and updates from our conservation efforts.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((post) => (
                  <article key={post.id} className="group bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                    {post.imageUrl && (
                      <div className="relative h-48">
                        <Image
                          src={post.imageUrl.startsWith('http') ? post.imageUrl : `https:${post.imageUrl}`}
                          alt={post.alt || post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span className="text-[#f6b417] font-medium">{post.category || 'Update'}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 leading-snug group-hover:text-[#f6b417] transition-colors">
                        <Link href={`/updates/${post.slug}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                      <Link 
                        href={`/updates/${post.slug}`} 
                        className="inline-flex items-center text-[#f6b417] font-medium hover:text-[#e0a416] transition-colors"
                      >
                        Read More
                        <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Link 
                  href="/updates" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium text-white bg-[#f6b417] hover:bg-[#e0a416] transition-colors"
                >
                  View All Updates
                  <FiArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}


// Generate static params for all posts
export async function generateStaticParams() {
  const posts = await getAllNewsItems();
  console.log('Generating static params for posts:', posts.map(p => p.slug));
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
