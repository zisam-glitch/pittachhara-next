'use client';

import { useEffect, useState } from 'react';
import { Layout } from '../components/layout';
import BackgroundMusic from '../components/BackgroundMusic';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getTeamMembers, TeamMember as ContentfulTeamMember } from '@/lib/contentful';
import { VideoPlayer } from '../components/VideoPlayer';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import ReadMore from '../components/ui/ReadMore';

interface TeamMemberCardProps {
  member: ContentfulTeamMember;
}

const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Convert rich text to plain text and trim to 50 characters
  const plainText = documentToPlainTextString(member.description);
  const MAX_LENGTH = 70;
  const needsTruncation = plainText.length > MAX_LENGTH;
  const displayText = isExpanded ? plainText : `${plainText.substring(0, MAX_LENGTH)}${needsTruncation ? '...' : ''}`;

  return (
    <div className="group text-center">
      <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden transition-all duration-300 group-hover:shadow-lg">
        <Image
          src={member.imageUrl ? `https:${member.imageUrl}` : '/placeholder-user.jpg'}
          alt={member.fullName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="px-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{member.fullName}</h3>
        <p className="text-[#f6b417] font-medium mb-2">{member.designation}</p>
        <div className="text-gray-600 text-sm leading-relaxed">
          {displayText}
          {needsTruncation && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[#f6b417] font-medium ml-1 hover:underline focus:outline-none"
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const videos = [
  {
    id: '1',
    title: '',
    description: '',
    src: '/about.mp4',
    thumb: ''
  }, 
  {
    id: '2',
    title: '',
    description: '',
    src: '/avs/1.mp4',
    thumb: ''
  }
];

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<ContentfulTeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const members = await getTeamMembers();
        setTeamMembers(members);
      } catch (err) {
        console.error('Failed to fetch team members:', err);
        setError('Failed to load team members. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <Layout>
      <BackgroundMusic audioSrc="/audio/about-background-music.mp3" />
      <div className="min-h-screen">
        {/* Hero Section with Video Background */}
        <section className="relative h-[32rem] font-larken flex items-center justify-center text-white overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 w-full h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="https://res.cloudinary.com/db1i46uiv/video/upload/v1763963270/VID_20251121192100_1_miyvkv.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-10" />
          </div>

          {/* Hero Content */}
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h1 className="text-5xl font-bold mb-4">
              About Us
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Meet the Gurardians of This Living Forest.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section id="our-story" className="py-24 text-gray-800 bg-white font-geograph">
          <div className="container mx-auto px-6 h-full">
            <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] items-center gap-20">
              <div className="">
                <h2 className="text-3xl font-bold mb-6">Pittachhara Trust</h2>
                <div className="w-24 h-1 bg-[#f6b417] mb-6"></div>
                <p className="text-gray-600 text-lg mb-6">
                  Since its inception in 2017, Pittachhara Trust has been officially recognized by the International Union for Conservation of Nature (IUCN) as an Other Effective Area-based Conservation Measure (OECM) — one of the first in Bangladesh. OECMs achieve sustained, effective in-situ biodiversity conservation outside traditional protected networks, contributing to global biodiversity targets such as Aichi Target 11 and the post-2020 Global Biodiversity Framework. Pittachhara Trust serves as a model for community-driven, privately managed forest conservation. The forest spans approximately 50 acres (≈20 hectares) of privately owned land in Khagrachari Hill District.
                </p>
                {/* <p className="text-gray-600 text-lg">
                  The forest spans approximately 50 acres (≈20 hectares) of privately owned land in Khagrachari Hill District. It is embedded within the globally recognised Indo-Burma Biodiversity Hotspot and remains one of the few well-vegetated, semi-evergreen hill forests in the region. Surveys have documented around 150 species of resident and migratory birds, including threatened taxa such as the Red-breasted Parakeet (Psittacula alexandri) and Cachar Bulbul (Hemixos flavala flavala). Key mammals include the Bengal Slow Loris (Nycticebus bengalensis), Northern Pig-tailed Macaque (Macaca leonina), and Leopard Cat (Prionailurus bengalensis), all listed as Vulnerable or Endangered on the IUCN Red List. The forest also hosts at least 26 species of snakes and other 20 reptiles and amphibians.
                </p> */}
              </div>
              <div className="">
                <img className='h-full' src="/about2.png" alt="" />
              </div>
            </div>
          </div>
        </section>

        {/* Video Section 1 */}
        {/* <section id="our-story" className="pb-24 text-gray-800 bg-white font-geograph">
          <div className="container mx-auto px-6 h-full">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] items-center gap-16">
              <div className="hidden md:block">
                <VideoPlayer
                  video={videos[0]}
                  height='h-full'
                  showDetails={false}
                  className='pb-2'
                />
              </div>
              <div className="">
                <p className="text-gray-600 font-bold text-lg mb-6">
                  Through rewilding and reforestation programs, Pittachhara Trust undertakes native tree enrichment, stream restoration, and habitat protection to rebuild ecological connectivity. 
                </p>
                <p className="text-gray-600 text-lg">
                  Our work extends beyond the forest boundary by engaging local communities in sustainable livelihoods, providing alternative income sources such as handicrafts, mushroom cultivation, free-range poultry, and organic farming — reducing dependency on logging and hunting.
                </p>
              </div>
              <div className="block md:hidden">
                <VideoPlayer
                  video={videos[0]}
                  height='h-full'
                  showDetails={false}
                  className='pb-2'
                />
              </div>
            </div>
          </div>
        </section> */}

        {/* Video Section 2 */}
        {/* <section id="our-story" className="pb-24 text-gray-800 bg-white font-geograph">
          <div className="container mx-auto px-6 h-full">
            <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] items-center gap-16">
              <div className="">
                <p className="text-gray-600 font-bold text-lg mb-6">
                  Pittachhara Trust also operates a wildlife rescue, rehabilitation, and release facility, caring for injured and displaced animals while complementing national conservation efforts.
                </p>
                <p className='text-gray-600 text-lg'> 
                  By integrating ecological restoration, biodiversity protection, and community engagement, the Trust offers a scalable, sustainable, and nature-based solution to biodiversity loss and climate challenges in Bangladesh.
                </p>
              </div>
              <div className="">
                <VideoPlayer
                  video={videos[1]}
                  height='h-[300px]'
                  showDetails={false}
                  className='pb-2'
                />
              </div>
            </div>
          </div>
        </section> */}

        {/* Our Team */}
        <section className="py-24 bg-gray-50 font-geograph">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Meet Our Team</h2>
              <div className="w-24 h-1 bg-[#f6b417] mx-auto mb-6"></div>
              <p className="text-lg text-gray-600">
                Our dedicated team of professionals brings together diverse expertise and a shared passion for excellence in conservation and community development.
              </p>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#f6b417]"></div>
                <p className="mt-4 text-gray-600">Loading team members...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
              </div>
            ) : teamMembers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">No team members found.</p>
              </div>
            )}
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-white text-gray-800 font-geograph">
          <div className="container mx-auto px-6 h-full">
            <div className="flex flex-col items-center md:flex-row-reverse gap-16 h-full">
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">Our Achievements</h2>
                <div className="w-24 h-1 bg-[#f6b417] mb-6"></div>

                <div className="space-y-8">
                  {[
                    {
                      title: 'Innovation',
                      description: 'Pittachhara Trust pioneers an innovative rewilding approach that integrates native forest restoration with stream rehabilitation to strengthen ecological connectivity. Guided by a “no-intervention is the best intervention” policy, the initiative also supports sustainable community livelihoods, empowering local people as long-term partners in conservation.'
                    },
                    {
                      title: 'Excellence',
                      description: 'Pittachhara Trust stands out for its commitment to science-based rewilding and long-term ecosystem restoration in one of Bangladesh’s most threatened hill forest landscapes. In 2022, the Trust’s founder received the prestigious Balipara Foundation Award for its pioneering rewilding work. Its conservation site is also recognized as Bangladesh’s first OECM by IUCN and WWF, marking a national milestone in area-based biodiversity protection. The Trust’s excellence is further strengthened by its founder’s significant role in national social forestry policy development. In addition, the founder serves on the Advisory Board for Bangladesh Wildlife under the Ministry of Environment, Forest and Climate Change. These leadership contributions reflect the Trust’s credibility and influence in shaping conservation policy. Together, they underscore Pittachhara Trust’s position as a model for inclusive, innovative, and impactful conservation in Bangladesh. '
                    },
                    {
                      title: 'Collaboration',
                      description: 'The Pittachhara Trust collaborates with international and national institutions, including the German organization Plumploris e.V., Bangladesh Forest Research Institute (BFRI), the Oriental Bird Club (OBC), and several universities. Through these partnerships, the Trust conducts continuous wildlife surveys to understand population trends, ecological drivers, and habitat health. Its research focuses on biodiversity assessment, natural stream restoration, and the conservation of threatened and endangered species. The Trust also provides research opportunities for national and international scholars, supporting PhD studies, internships, and field-based conservation programs. These collaborations strengthen science-driven decision-making and advance long-term conservation outcomes for the region.'
                    }
                  ].map((value, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1 text-gray-800">{value.title}</h3>
                        <ReadMore text={value.description} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-1/2 h-full">
                <div className="relative w-full h-full min-h-[400px] md:min-h-[500px] overflow-hidden">
                  <Image
                    src="/Picture1.jpg"
                    alt="Our Core Values"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}