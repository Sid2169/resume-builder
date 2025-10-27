export const alanTuringResume = {
  contact: {
    name: 'Alan Turing',
    title: 'Mathematician & Computer Science Pioneer',
    email: '',
    phone: '',
    location: 'Wilmslow, Cheshire, England',
    website: '',
    linkedin: '',
  },
  summary:
    'British mathematician and cryptanalyst (1912–1954) whose research established foundations of theoretical computer science. Contributed to wartime Enigma cryptanalysis, early computer design, machine intelligence, and mathematical biology. Elected Fellow of the Royal Society in 1951.',
  experience: [
    {
      id: 'sample-exp-1',
      role: 'Reader in Mathematics',
      company: 'University of Manchester',
      location: 'Manchester, England',
      start: '1948',
      end: '1954',
      bullets: [
        'Contributed to Manchester computer programming and numerical analysis.',
        'Published foundational research on machine intelligence and reaction–diffusion models of biological pattern formation.',
      ],
    },
    {
      id: 'sample-exp-2',
      role: 'Mathematician',
      company: 'National Physical Laboratory',
      location: 'Teddington, England',
      start: '1945',
      end: '1948',
      bullets: [
        'Designed the Automatic Computing Engine (ACE), proposing a stored-program electronic computer in 1946.',
        'Wrote Intelligent Machinery in 1948, exploring machine learning and artificial intelligence.',
      ],
    },
    {
      id: 'sample-exp-3',
      role: 'Cryptanalyst',
      company: 'Government Code and Cypher School',
      location: 'Bletchley Park, England',
      start: '1939',
      end: '1945',
      bullets: [
        'Developed methods for breaking German naval Enigma messages, including statistical cryptanalysis.',
        'Co-developed the British Bombe with Gordon Welchman, building on earlier Polish cryptanalytic work.',
      ],
    },
  ],
  education: [
    {
      id: 'sample-edu-1',
      degree: 'Ph.D. in Mathematics',
      school: 'Princeton University',
      location: 'Princeton, New Jersey, USA',
      start: '1936',
      end: '1938',
      details: 'Thesis: Systems of Logic Based on Ordinals · Supervisor: Alonzo Church',
    },
    {
      id: 'sample-edu-2',
      degree: 'B.A. in Mathematics',
      school: "King's College, University of Cambridge",
      location: 'Cambridge, England',
      start: '1931',
      end: '1934',
      details: "Elected Fellow of King's College in 1935 for research on the central limit theorem.",
    },
  ],
  skills:
    'Mathematical logic, Computability theory, Cryptanalysis, Probability, Computer design, Numerical analysis, Machine intelligence, Mathematical biology',
  projectsLabel: 'Research',
  projects: [
    {
      id: 'sample-project-1',
      name: 'On Computable Numbers, with an Application to the Entscheidungsproblem',
      link: 'https://doi.org/10.1112/plms/s2-42.1.230',
      description:
        '1936–1937 · Introduced Turing machines and universal computation, establishing the undecidability of the Entscheidungsproblem.',
    },
    {
      id: 'sample-project-2',
      name: 'Computing Machinery and Intelligence',
      link: 'https://doi.org/10.1093/mind/LIX.236.433',
      description:
        '1950 · Proposed the imitation game, now known as the Turing test, and examined whether machines can think.',
    },
    {
      id: 'sample-project-3',
      name: 'The Chemical Basis of Morphogenesis',
      link: 'https://doi.org/10.1098/rstb.1952.0012',
      description:
        '1952 · Developed a reaction–diffusion theory explaining how chemical processes can generate biological patterns.',
    },
  ],
}
