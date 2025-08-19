import React, { useState, useCallback, useRef, useEffect } from 'react';
import { resumeData, skillExperienceMapping } from './constants';
import { 
  MailIcon, 
  PhoneIcon, 
  LocationIcon, 
  ClipboardCheckIcon, 
  ClipboardIcon 
} from './constants';
import Section from './components/Section';
import SkillBadge from './components/SkillBadge';
import AIAssistant from './components/AIAssistant';

const App: React.FC = () => {
  const [copied, setCopied] = useState('');
  const [highlightedIds, setHighlightedIds] = useState<string[]>([]);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (highlightedIds.length > 0) {
        const firstId = highlightedIds[0];
        const element = sectionRefs.current[firstId];
        setTimeout(() => {
            element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }
  }, [highlightedIds]);

  const handleCopy = useCallback((text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  }, []);

  const handleSkillClick = useCallback((skill: string) => {
    if (skill === activeSkill) {
        setHighlightedIds([]);
        setActiveSkill(null);
        return;
    }

    const ids = skillExperienceMapping[skill] || [];
    setHighlightedIds(ids);
    setActiveSkill(skill);
  }, [activeSkill]);

  const renderContactItem = (Icon: React.FC<{className?: string}>, text: string, type: string) => (
    <div className="flex items-center text-slate-300">
      <Icon className="w-5 h-5 mr-2 text-blue-400" />
      <span>{text}</span>
      <button 
        onClick={() => handleCopy(text, type)}
        className="ml-2 p-2 rounded-full hover:bg-slate-700 hover:scale-110 transition-all"
        aria-label={`Copy ${type}`}
      >
        {copied === type ? 
          <ClipboardCheckIcon className="w-4 h-4 text-emerald-400" /> : 
          <ClipboardIcon className="w-4 h-4 text-slate-400" />}
      </button>
    </div>
  );

  const renderHighlightableItem = (id: string, children: React.ReactNode) => (
      <div
        ref={(el) => { sectionRefs.current[id] = el; }}
        className={`transition-all duration-300 rounded-lg ${highlightedIds.includes(id) ? 'bg-cyan-900/40 ring-1 ring-cyan-500' : 'bg-transparent'}`}
      >
        <div className="p-2">
            {children}
        </div>
      </div>
  )

  return (
    <div className="min-h-screen font-sans p-4 sm:p-6 md:p-8 bg-gradient-to-br from-slate-900 via-gray-900 to-violet-900/50 animate-background-pan" style={{ backgroundSize: '200% 200%' }}>
      <div className="max-w-6xl mx-auto">
        <header className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg shadow-lg text-center border border-slate-700/50">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 text-transparent bg-clip-text">
            {resumeData.name}
          </h1>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-x-6 gap-y-2 mt-4 text-sm">
            {resumeData.contact.email && renderContactItem(MailIcon, resumeData.contact.email, 'email')}
            {resumeData.contact.phone && renderContactItem(PhoneIcon, resumeData.contact.phone, 'phone')}
            {resumeData.contact.location && renderContactItem(LocationIcon, resumeData.contact.location, 'location')}
          </div>
        </header>

        <main className="mt-8 space-y-8">
          <AIAssistant />

          <Section title="Technical Skills">
            <div className="space-y-3">
              {resumeData.technicalSkills.map((category) => (
                <div key={category.title}>
                  <h3 className="font-semibold text-slate-300 mb-2">{category.title}</h3>
                  <div>
                    {category.skills.map((skill) => (
                      <SkillBadge
                        key={skill}
                        skill={skill}
                        onClick={handleSkillClick}
                        isActive={activeSkill === skill}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <Section title="Technical Experience">
                <div className="space-y-6">
                  {resumeData.technicalExperience.map((exp) => (
                    <div key={exp.id} ref={(el) => { sectionRefs.current[exp.id!] = el; }} className={`p-2 -m-2 rounded-lg transition-all duration-300 ${highlightedIds.includes(exp.id!) ? 'bg-cyan-900/40 ring-1 ring-cyan-500' : ''}`}>
                      <div className="flex flex-col sm:flex-row justify-between sm:items-baseline">
                        <h3 className="font-bold text-lg text-slate-100">{exp.role}</h3>
                        <p className="text-sm font-medium text-slate-400">{exp.duration}</p>
                      </div>
                      <p className="text-md font-semibold text-blue-400">
                        {exp.companyURL ? (
                          <a href={exp.companyURL} target="_blank" rel="noopener noreferrer" className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-sm transition-colors">
                            {exp.company}
                          </a>
                        ) : (
                          exp.company
                        )}
                         - <span className="text-slate-300 font-normal">{exp.location}</span>
                      </p>
                      <ul className="list-disc list-inside mt-2 space-y-1 text-slate-300">
                        {exp.description.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </Section>
            </div>

            <div className="md:col-span-1 space-y-8">
               <Section title="Education">
                  {resumeData.education.map((edu) => (
                    <div key={edu.id} ref={(el) => { sectionRefs.current[edu.id!] = el; }} className={`p-2 -m-2 rounded-lg transition-all duration-300 ${highlightedIds.includes(edu.id!) ? 'bg-cyan-900/40 ring-1 ring-cyan-500' : ''}`}>
                      <h3 className="font-bold text-slate-100">{edu.institution}</h3>
                      <p className="text-slate-300">{edu.degree}</p>
                      <p className="text-sm text-slate-400 mt-1">{edu.duration}</p>
                    </div>
                  ))}
               </Section>

               <Section title="Other Experience">
                 {resumeData.otherExperience.map((exp) => (
                    <div key={exp.id} ref={(el) => { sectionRefs.current[exp.id!] = el; }} className={`p-2 -m-2 rounded-lg transition-all duration-300 ${highlightedIds.includes(exp.id!) ? 'bg-cyan-900/40 ring-1 ring-cyan-500' : ''}`}>
                      <h3 className="font-bold text-slate-100">{exp.role}</h3>
                      <p className="text-slate-300">
                         {exp.institutionURL ? (
                          <a href={exp.institutionURL} target="_blank" rel="noopener noreferrer" className="hover:underline focus:outline-none focus:ring-2 focus:ring-slate-400 rounded-sm transition-colors">
                            {exp.institution}
                          </a>
                        ) : (
                          exp.institution
                        )}
                      </p>
                       <p className="text-sm text-slate-400 mt-1">{exp.duration}</p>
                      <ul className="list-disc list-inside mt-2 space-y-1 text-slate-300 text-sm">
                        {exp.description.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                  ))}
               </Section>
               
               <Section title="Publications">
                 {resumeData.publications.map((pub) => (
                   <div key={pub.id} ref={(el) => { sectionRefs.current[pub.id!] = el; }} className={`p-2 -m-2 rounded-lg transition-all duration-300 ${highlightedIds.includes(pub.id!) ? 'bg-cyan-900/40 ring-1 ring-cyan-500' : ''}`}>
                    {pub.url ? (
                      <a href={pub.url} target="_blank" rel="noopener noreferrer" className="block text-sm text-slate-300 hover:text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-sm transition-colors">
                        {pub.details}
                      </a>
                    ) : (
                      <p className="text-sm text-slate-300">{pub.details}</p>
                    )}
                   </div>
                 ))}
               </Section>

                <Section title="Certificates">
                 {resumeData.certificates.map((cert) => (
                    <div key={cert.id} ref={(el) => { sectionRefs.current[cert.id!] = el; }} className={`p-2 -m-2 rounded-lg transition-all duration-300 ${highlightedIds.includes(cert.id!) ? 'bg-cyan-900/40 ring-1 ring-cyan-500' : ''}`}>
                      <h3 className="font-bold text-slate-100">{cert.title}</h3>
                      <p className="text-sm font-semibold text-slate-300">{cert.institution}</p>
                      <ul className="list-disc list-inside mt-2 space-y-1 text-slate-300 text-sm">
                        {cert.description.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                  ))}
               </Section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
