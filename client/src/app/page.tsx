import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
import ClientNoteCard from "@/components/ClientNoteCard";
import ViewNotesButton from "@/components/ViewNotesButton";
import SignUpButton from "@/components/SignUpButton";
import GetStartedButton from "@/components/GetStartedButton";
import LearnMoreButton from "@/components/LearnMoreButton";

export default function Home() {
  // Mock data for demonstration
  const sampleNotes = [
    {
      id: '1',
      title: 'Welcome to Snapshot Notes',
      content: 'This is your first note. Start capturing your thoughts, ideas, and important information. Organize with tags and access from anywhere.',
      createdAt: new Date().toISOString(),
      tags: ['welcome', 'getting-started']
    },
    {
      id: '2',
      title: 'How to use Snapshot Notes',
      content: 'Create new notes, organize them with tags, search your collection, and never lose an important thought again. Snapshot Notes makes it easy to keep track of everything.',
      createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      tags: ['tutorial', 'help']
    },
    {
      id: '3',
      title: 'Tips for productivity',
      content: 'Use tags to organize related notes, create daily notes for journaling, and use the search feature to quickly find what you need.',
      createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      tags: ['productivity', 'tips']
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  Capture Your Thoughts With Snapshot Notes
                </h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                  The simple, intuitive note-taking app that helps you organize your ideas, tasks, and memories in one place.
                </p>
                <div className="flex flex-wrap gap-4">
                  <GetStartedButton />
                  <LearnMoreButton />
                </div>
              </div>
              
              <div className="flex justify-center">
                <Image 
                  src="/file.svg" 
                  alt="Notes illustration" 
                  width={400} 
                  height={400}
                  className="max-w-full h-auto dark:invert" 
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features section */}
        <section id="features" className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Why Choose Snapshot Notes?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card title="Easy to Use">
                <p className="text-gray-600 dark:text-gray-400">
                  Simple, intuitive interface that makes note-taking a breeze.
                </p>
              </Card>
              
              <Card title="Organize with Tags">
                <p className="text-gray-600 dark:text-gray-400">
                  Keep your notes organized with customizable tags.
                </p>
              </Card>
              
              <Card title="Access Anywhere">
                <p className="text-gray-600 dark:text-gray-400">
                  Your notes sync across all your devices for access anywhere.
                </p>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Sample notes section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
              Featured Notes
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
              Here are some examples of what you can do with Snapshot Notes
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sampleNotes.map((note) => (
                <ClientNoteCard 
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  content={note.content}
                  createdAt={note.createdAt}
                  tags={note.tags}
                />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <ViewNotesButton />
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-16 bg-blue-600 dark:bg-blue-700">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to start taking better notes?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already simplified their note-taking process with Snapshot Notes.
            </p>
            <SignUpButton />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
          
       