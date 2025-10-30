'use client';

import { Layout } from '../components/layout';
import Image from 'next/image';

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

const teamMembers: TeamMember[] = [
  {
    name: 'John Doe',
    role: 'Founder & CEO',
    bio: 'With over 10 years of experience in the industry, John leads our team with vision and passion.',
    image: '/russel.jpg',
  },
  {
    name: 'Jane Smith',
    role: 'Creative Director',
    bio: 'Jane brings creativity and innovation to every project, ensuring our work stands out.',
    image: '/3.jpg',
  },
  {
    name: 'Alex Johnson',
    role: 'Lead Developer',
    bio: 'Alex turns ideas into reality with clean, efficient code and technical expertise.',
    image: '/2.jpg',
  },
  {
    name: 'Sarah Williams',
    role: 'Community Manager',
    bio: 'Sarah builds and nurtures our community with dedication and enthusiasm.',
    image: '/1.jpg',
  },
];

export default function AboutPage() {
  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section with Background Image */}
        <section className="relative h-[32rem] font-larken flex items-center justify-center text-white overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/about.jpg"
              alt=""
              fill
              className="object-cover"
              priority
              quality={100}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Hero Content */}
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h1 className="text-5xl font-bold mb-4">
              About Us
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              We are a passionate team dedicated to creating amazing experiences through technology and innovation.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section id="our-story" className="py-24 text-gray-800  bg-white font-geograph">
          <div className="container mx-auto px-6 h-full">
            <div className="flex flex-col md:flex-row align-center items-stretch gap-16 h-full">
              <div className="w-full md:w-3/4">
                <h2 className="text-3xl font-bold mb-6">About PIC</h2>
                <div className="w-24 h-1 bg-[#f6b417] mb-6"></div>
                <p className="text-gray-600 text-lg mb-6">
                  Pittachhara, the only privately founded and protected forest in Bangladesh, located at Matiranga upazila of Khagrachari District.
                  The total conservation area of this ever-green forest  is<b className='text-red-600 font-bold'> 14.56 hectors.</b>


                </p>
                <p className="text-gray-600 text-lg mb-6">
                  Pittachhara represents a rare and effective privately‑led conservation model in Bangladesh that combines ecological restoration, community development, health, education, advocacy, and wildlife rescue, rehabilitation, research in a challenging region. While deforestation remains a threat, PCI’s holistic approach—melding conservation with local incentives and policy engagement—offers a hopeful blueprint for protecting the Chattogram Hill Tracts’ precious biodiversity.

                </p>
                <p className="text-gray-600 text-lg ">
                  PCI is known for its ecologically rich landscapes and diverse habitats that support many species, including regionally endemic and globally threatened ones. Its focus on reforestation and habitat restoration has led to noticeable improvements in local wildlife populations, highlighting PCI’s vital role in conserving regional biodiversity.

                </p>
              </div>
              <div className="w-full md:w-1/2 h-full flex justify-end">
                <div className="relative w-full h-full min-h-[400px] md:min-h-[600px] rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex justify-end">
                    <div className="relative h-full w-full max-w-[90%]">
                      <Image
                        src="/about2.jpg"
                        alt="Our Team Working Together"
                        fill
                        className="object-contain object-right"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="group text-center">
                  <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden transition-all duration-300 group-hover:shadow-lg">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <div className="px-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-[#f6b417] font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                    
                  </div>
                </div>
              ))}
            </div>
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
                      description: 'We embrace change and constantly seek new ways to solve problems and create value.'
                    },
                    {
                      title: 'Excellence',
                      description: 'We strive for the highest standards in everything we do, delivering quality without compromise.'
                    },
                    {
                      title: 'Collaboration',
                      description: 'We believe in the power of teamwork and building strong relationships with our clients and partners.'
                    }
                  ].map((value, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-1 text-gray-800">{value.title}</h3>
                        <p className="text-gray-600">{value.description}</p>
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
