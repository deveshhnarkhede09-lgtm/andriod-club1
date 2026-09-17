/**
 * StudyFlow AI - Curated Academic Presets
 * Pre-loaded realistic lectures across Computer Science, Biology, and AI
 */

const ACADEMIC_PRESETS = {
  physics: {
    id: "physics",
    subject: "eng",
    domainLabel: "Engineering & Physics",
    courseCode: "PHYS 101",
    title: "Physics_Chapter_3.pdf",
    rawContent: `CHAPTER 3: WORK, ENERGY, CONSERVATION OF MOMENTUM, AND RIGID BODY DYNAMICS
Course: PHYS 101 - University Physics: Classical Mechanics
Document: Physics_Chapter_3.pdf

1. WORK-ENERGY THEOREM AND CONSERVATIVE FORCES
Work done by a force F on an object moving along displacement dr is defined as the line integral W = ∫ F · dr.
When the scalar product F · dr is evaluated for a constant force, W = F d cos(θ).
- Work-Energy Theorem: The net work done by all forces (conservative and non-conservative) on a particle equals the change in its kinetic energy: W_net = ΔK = (1/2) m v_f² - (1/2) m v_i².
- Conservative Forces: A force is conservative if the work done in moving an object between two points depends only on the endpoints and is independent of the path taken (e.g., Gravitational force F_g = -mg ĵ, Spring force F_s = -kx via Hooke's law).
- For conservative forces, a potential energy function U can be defined such that F = -∇U. Consequently, in an isolated system with only conservative forces, Mechanical Energy E = K + U is strictly conserved (ΔE = 0).
- Non-Conservative Forces: Frictional forces and air drag convert mechanical energy into thermal energy: W_nc = ΔE_mech = ΔK + ΔU.

2. LINEAR MOMENTUM AND IMPULSE
Linear momentum p of an object of mass m moving with velocity v is a vector quantity defined as p = m v.
Newton's Second Law in terms of momentum: F_net = dp/dt.
- Impulse J is defined as the time integral of force: J = ∫ F dt = Δp = p_f - p_i (Impulse-Momentum Theorem).
- Law of Conservation of Linear Momentum: In an isolated system (where net external force ΣF_ext = 0), the total vector linear momentum remains constant over time.
- Collision Dynamics:
  * Elastic Collisions: Both total linear momentum and total kinetic energy are conserved (e.g., atomic subatomic scatterings). Relative speed of recession equals relative speed of approach: (v_2f - v_1f) = -(v_2i - v_1i).
  * Inelastic Collisions: Total momentum is conserved, but kinetic energy is not conserved (some is transformed into heat, sound, or deformation).
  * Completely Inelastic Collisions: The colliding bodies stick together after impact and move with a common final velocity: v_f = (m1 v1 + m2 v2) / (m1 + m2), resulting in maximum kinetic energy dissipation.

3. ROTATIONAL DYNAMICS AND ANGULAR MOMENTUM
Rotational motion mirrors translational dynamics:
- Moment of Inertia (I): The rotational analog of mass, measuring rotational inertia about an axis: I = ∫ r² dm. For a solid cylinder/disk, I = (1/2) M R²; for a solid sphere, I = (2/5) M R².
- Torque τ = r × F = I α, where α is angular acceleration.
- Rotational Kinetic Energy: K_rot = (1/2) I ω².
- Angular Momentum L = r × p = I ω. If net external torque Στ_ext = 0, total angular momentum is strictly conserved: I_i ω_i = I_f ω_f (explaining a spinning figure skater speeding up as arms are retracted).`,

    tldr: "The Work-Energy Theorem dictates that net work equals the change in kinetic energy (W_net = ΔK), with mechanical energy conserved in systems with only conservative forces. In isolated systems with zero external forces, linear momentum is conserved across all collisions. Rotational dynamics follow angular momentum conservation (L = Iω) when net external torque vanishes.",

    keyConcepts: [
      {
        title: "Work-Energy Theorem & Potential Energy Wells",
        points: [
          "W_net = ΔK = 1/2 m v_f² - 1/2 m v_i² holds universally for both constant and variable forces.",
          "A force is conservative if and only if curl(F) = 0 and work is path-independent.",
          "Mechanical energy conservation Δ(K + U) = 0 holds strictly in the absence of non-conservative dissipative forces."
        ]
      },
      {
        title: "Conservation of Linear Momentum & Collision Categories",
        points: [
          "Impulse J = ∫ F dt equals change in momentum Δp.",
          "Elastic collisions conserve both momentum and kinetic energy.",
          "Completely inelastic collisions involve bodies sticking together, maximizing mechanical energy loss to deformation and thermal dissipation."
        ]
      },
      {
        title: "Rotational Kinematics & Angular Momentum Conservation",
        points: [
          "Moment of Inertia I = ∫ r² dm represents resistance to angular acceleration α.",
          "Torque τ = I α mirrors Newton's second law F = ma.",
          "When net external torque is zero, L = I ω is conserved, meaning decreasing moment of inertia increases angular velocity."
        ]
      }
    ],

    callouts: [
      {
        type: "definition",
        title: "Conservative Force",
        content: "A force is conservative if the work done moving a particle between two points is entirely independent of the path taken, permitting the definition of potential energy U where F = -∇U."
      },
      {
        type: "formula",
        title: "Work-Energy & Angular Momentum Equations",
        content: "W_net = ΔK = (1/2)mv_f² - (1/2)mv_i²;  L = I ω;  τ = dL/dt = I α"
      },
      {
        type: "warning",
        title: "Exam Trap: Momentum vs Kinetic Energy in Inelastic Collisions",
        content: "In ALL collisions without external forces, linear momentum is 100% conserved. Kinetic energy is ONLY conserved in perfectly elastic collisions!"
      }
    ],

    checklist: [
      "State and derive the Work-Energy Theorem for a particle undergoing 1D motion",
      "Calculate the coefficient of restitution and explain energy loss in completely inelastic collisions",
      "Explain why internal friction forces cannot change the total momentum of a closed system",
      "Calculate the moment of inertia for standard symmetric geometries (cylinder vs sphere)",
      "Apply conservation of angular momentum to calculate final spin rate when mass distribution changes"
    ],

    quiz: [
      {
        question: "In a completely inelastic collision between two identical masses moving toward each other at speed v, what happens to their final velocity and kinetic energy?",
        options: [
          "They bounce back with speed v, conserving 100% of kinetic energy.",
          "They stick together and come to a complete stop (v_f = 0), converting 100% of initial kinetic energy into deformation/heat.",
          "They rotate around each other at speed 2v.",
          "Their mass doubles and velocity increases by √2."
        ],
        correctIndex: 1,
        explanation: "By conservation of momentum, m(v) + m(-v) = 2m(v_f) = 0, so v_f = 0. All initial kinetic energy is dissipated as internal thermal/strain energy."
      },
      {
        question: "Which of the following is a necessary and sufficient condition for a physical force to be classified as 'conservative'?",
        options: [
          "The force must be proportional to velocity.",
          "The total work done by the force around any closed path must equal zero (∮ F · dr = 0).",
          "The force can only act in a vacuum.",
          "The acceleration caused by the force must be constant over time."
        ],
        correctIndex: 1,
        explanation: "A force is conservative if the work done around any closed loop is zero, which is mathematically equivalent to path-independence and having zero curl."
      },
      {
        question: "Why does a spinning figure skater rotate faster when pulling their outstretched arms inwards towards their torso?",
        options: [
          "Retracting arms creates an external driving torque.",
          "Pulling in arms decreases the moment of inertia (I), requiring angular velocity (ω) to increase to conserve angular momentum (L = Iω).",
          "Air resistance decreases to zero.",
          "Centripetal acceleration converts gravitational energy into kinetic energy."
        ],
        correctIndex: 1,
        explanation: "Because there is no net external torque, angular momentum L = Iω is conserved. Reducing radius r reduces I = ∑mr², forcing angular velocity ω to increase."
      },
      {
        question: "According to the Work-Energy Theorem, what quantity equals the net work done by all forces acting on a particle?",
        options: [
          "The change in potential energy (-ΔU)",
          "The change in kinetic energy (ΔK)",
          "The change in momentum (Δp)",
          "The total mechanical energy divided by time"
        ],
        correctIndex: 1,
        explanation: "The Work-Energy Theorem explicitly states that W_net = ΔK = K_final - K_initial for all forces acting on the body."
      },
      {
        question: "A solid sphere and a hollow hoop of equal mass and radius roll down an incline from rest without slipping. Which reaches the bottom first and why?",
        options: [
          "The hollow hoop, because all its mass is distributed at the outer edge.",
          "The solid sphere, because it has a smaller moment of inertia (2/5 MR² vs MR²), leaving more energy for translational velocity.",
          "They arrive at the exact same instant due to Galileo's equivalence principle.",
          "The hoop, because its rotational friction is smaller."
        ],
        correctIndex: 1,
        explanation: "The solid sphere has a smaller moment of inertia (0.4 MR² vs 1.0 MR²). It partitions less energy into rotation, leaving more energy for translational velocity."
      }
    ],

    flashcards: [
      {
        term: "Work-Energy Theorem",
        def: "The net work done by all forces on an object equals the change in its kinetic energy: W_net = ΔK."
      },
      {
        term: "Conservation of Linear Momentum",
        def: "Total momentum of an isolated system remains constant over time if the net external force is zero."
      },
      {
        term: "Moment of Inertia (I)",
        def: "A measure of an object's resistance to rotational acceleration about a given axis: I = ∫ r² dm."
      },
      {
        term: "Conservation of Angular Momentum",
        def: "In the absence of external torque, total angular momentum L = Iω remains constant."
      },
      {
        term: "Conservative Force",
        def: "A force for which work done is independent of the path taken; associated with a scalar potential energy function F = -∇U."
      }
    ]
  },
  docx: {
    id: "docx",
    subject: "humanities",
    domainLabel: "World Literature & Theory",
    courseCode: "LIT 201",
    title: "Literature_Essay_Draft.docx",
    rawContent: `DRAFT ESSAY: THE ARCHITECTURE OF CONSCIOUSNESS IN MODERNIST FICTION
Course: LIT 201 - Twentieth-Century Narrative Forms
Document: Literature_Essay_Draft.docx

1. THE BREAK FROM 19TH-CENTURY REALISM
The transition from Victorian realism (represented by George Eliot and Anthony Trollope) to High Modernism (Virginia Woolf, James Joyce, William Faulkner) was marked by a fundamental skepticism toward objective, omniscient narration. Realist novels rested upon shared epistemic assumptions: that external reality is stable, that clock time (chronos) proceeds uniformly, and that human motive can be reliably cataloged.

Modernist authors, influenced by Henri Bergson's philosophy of psychological duration (durée) and Sigmund Freud's psychoanalytic topography, rejected chronological linear plotting. Instead, they localized narrative truth within the subjective, fragmented flow of internal consciousness.

2. STREAM OF CONSCIOUSNESS AND FREE INDIRECT DISCOURSE
Stream of consciousness is a narrative technique that seeks to replicate the uninterrupted, non-linear flow of mental associations, sensory impressions, memories, and subconscious impulses within a character's mind.
- Interior Monologue: A direct rendering of a character's thoughts using first-person syntax ('I wonder if he remembers the lilac bush...').
- Free Indirect Discourse (style indirect libre): A subtle narrative technique where an external third-person narrator blends seamlessly into a character's internal idiom, perceptual perspective, and voice without formal attribution tags like 'she thought' or 'he pondered' (e.g., Woolf's Mrs. Dalloway: 'What a lark! What a plunge!').
- Epiphany: Term popularized by James Joyce in Dubliners and A Portrait of the Artist as a Young Man to designate a sudden, intuitive spiritual manifestation or moment of acute clarity sparked by a trivial gesture or sensory encounter.

3. TEMPORAL NON-LINEARITY AND MULTI-PERSPECTIVISM
Modernist novels frequently employ multi-perspectivism—juxtaposing conflicting subjective viewpoints on the same event without an authoritative resolving voice (as in Faulkner's The Sound and the Fury and As I Lay Dying). By shattering linear chronology through analepsis (flashback) and prolepsis (flashforward), Modernist fiction mirrors the destabilization of epistemological certainty following the trauma of the First World War.`,

    tldr: "Modernist literature revolutionized fiction by replacing Victorian omniscient realism with subjective psychological duration (durée). Techniques like stream of consciousness, Free Indirect Discourse, Joycean epiphanies, and multi-perspectivism deliberately fracture linear clock time to represent internal human consciousness.",

    keyConcepts: [
      {
        title: "Subjective Duration (Durée) vs Chronological Time",
        points: [
          "Replaced external Victorian plot structures with internal psychological duration.",
          "Bergsonian durée: psychological time expands or contracts based on emotional intensity.",
          "Post-WWI trauma dismantled faith in stable, omniscient narrative authorities."
        ]
      },
      {
        title: "Free Indirect Discourse & Stream of Consciousness",
        points: [
          "Stream of consciousness captures uninterrupted associative psychological flows.",
          "Free Indirect Discourse dissolves boundaries between narrator and character voice without quote attribution.",
          "Joycean Epiphany represents sudden transcendental illumination triggered by mundane stimuli."
        ]
      },
      {
        title: "Multi-Perspectivism & Temporal Fragmentation",
        points: [
          "Refusal of singular objective truth; narratives are refracted through conflicting subjectivities.",
          "Disruption of chronology via analepsis and prolepsis reflects epistemic instability."
        ]
      }
    ],

    callouts: [
      {
        type: "definition",
        title: "Free Indirect Discourse",
        content: "A narrative mode that fuses third-person narration with the idiosyncratic voice, emotions, and vocabulary of a character without speech tags or quotation marks."
      },
      {
        type: "formula",
        title: "Bergsonian Time Ratio",
        content: "Psychological Time (Durée) ≠ Chronometric Time (Clock Time). A single afternoon in Mrs. Dalloway encompasses decades of psychic memory."
      },
      {
        type: "warning",
        title: "Critical Distinction: Monologue vs Stream of Consciousness",
        content: "Interior monologue maintains grammatical coherence, whereas stream of consciousness deliberately mimics syntax-shattering associative memory and subconscious flux."
      }
    ],

    checklist: [
      "Distinguish Free Indirect Discourse from standard direct speech and third-person reportage",
      "Explain Henri Bergson's concept of durée and its influence on Virginia Woolf",
      "Analyze the role of the Joycean epiphany in twentieth-century modernist literature",
      "Contrast Victorian narrative omniscience with Modernist multi-perspectivism"
    ],

    quiz: [
      {
        question: "Which literary technique is characterized by third-person narration adopting a character's internal speech patterns without quotation marks or attribution tags?",
        options: [
          "Dramatic Monologue",
          "Free Indirect Discourse",
          "Picaresque Parody",
          "Epistolary Confession"
        ],
        correctIndex: 1,
        explanation: "Free Indirect Discourse (style indirect libre) embeds a character's subjective voice and thoughts directly into third-person narration."
      },
      {
        question: "What philosophical concept formulated by Henri Bergson directly inspired Modernist authors to abandon linear chronologies in favor of psychological time?",
        options: [
          "The Categorical Imperative",
          "Durée (Duration)",
          "The Social Contract",
          "Tabula Rasa"
        ],
        correctIndex: 1,
        explanation: "Bergson's 'durée' posits that time is experienced as an indivisible, subjective flow rather than discrete ticks of a clock."
      },
      {
        question: "In Modernist literary theory, what constitutes a Joycean 'Epiphany'?",
        options: [
          "A climactic duel between protagonist and antagonist.",
          "A sudden intuitive revelation of spiritual truth or profound insight provoked by an ordinary gesture.",
          "A formal poetic stanza breaking the prose format.",
          "A prophetic dream foreshadowing the novel's tragic denouement."
        ],
        correctIndex: 1,
        explanation: "James Joyce defined an epiphany as a sudden spiritual manifestation in which an ordinary scene or trivial comment reveals the essence of truth."
      }
    ],

    flashcards: [
      {
        term: "Free Indirect Discourse",
        def: "Narrative technique blending third-person narrator voice with a character's subjective interior consciousness."
      },
      {
        term: "Durée (Bergson)",
        def: "Subjective, continuous psychological time experienced by the human mind, distinct from uniform clock time."
      },
      {
        term: "Stream of Consciousness",
        def: "Literary method capturing the continuous associative flow of thoughts, memories, and sensory stimuli."
      }
    ]
  },
  pptx: {
    id: "pptx",
    subject: "bio",
    domainLabel: "Molecular Biology",
    courseCode: "BIO 204",
    title: "Biology_Lecture_Slides.pptx",
    rawContent: `SLIDE DECK 08: CRISPR-CAS9 GENOME EDITING AND REPLICATION FORK ARCHITECTURE
Course: BIO 204 - Molecular Genetics
Document: Biology_Lecture_Slides.pptx

SLIDE 1: ENZYMES AT THE REPLICATION FORK
- DNA Helicase unwinds the double helix by breaking hydrogen bonds between base pairs.
- Topoisomerase (Gyrase) relieves supercoiling strain ahead of the fork.
- DNA Polymerase III synthesizes DNA strictly 5' -> 3' requiring a free 3'-OH primer provided by RNA Primase.
- Okazaki fragments on the lagging strand are processed by DNA Pol I and joined by DNA Ligase.

SLIDE 2: CRISPR-CAS9 ADAPTIVE IMMUNITY
- CRISPR locus stores viral protospacers captured by Cas1-Cas2.
- SpCas9 requires synthetic Single Guide RNA (sgRNA = crRNA + tracrRNA).
- PAM (Protospacer Adjacent Motif, 5'-NGG-3') is essential for DNA interrogation and unwinding.
- Cleavage domains: HNH cuts complementary strand, RuvC cuts non-complementary strand -> blunt Double-Stranded Break (DSB).

SLIDE 3: REPAIR PATHWAYS
- Non-Homologous End Joining (NHEJ): Error-prone, active all cycle, introduces frameshifting indels for gene knockout.
- Homology-Directed Repair (HDR): High-fidelity, active S/G2 phase, uses donor DNA template for precise sequence insertion.`,

    tldr: "Replication fork progression involves helicase unwinding and Okazaki fragment processing via DNA Ligase. CRISPR-Cas9 utilizes sgRNA guidance and PAM recognition (5'-NGG-3') to create double-stranded breaks repaired by either error-prone NHEJ (knockout) or high-fidelity HDR (gene editing).",

    keyConcepts: [
      {
        title: "Replication Fork Enzymology",
        points: [
          "DNA Helicase unzips hydrogen bonds while Topoisomerase relieves supercoiling torque.",
          "Polymerase cannot synthesize de novo without free 3'-OH provided by RNA Primase."
        ]
      },
      {
        title: "CRISPR-Cas9 Mechanism: sgRNA, PAM & Cleavage",
        points: [
          "Cas9 probes genomic DNA for the 5'-NGG-3' PAM motif before binding sgRNA target.",
          "HNH cleaves complementary strand; RuvC cleaves non-complementary strand."
        ]
      },
      {
        title: "Cellular Repair: NHEJ vs HDR",
        points: [
          "NHEJ creates frameshift knockouts; HDR uses exogenous repair template for gene insertions."
        ]
      }
    ],

    callouts: [
      {
        type: "definition",
        title: "The PAM Motif",
        content: "5'-NGG-3' sequence required immediately 3' of the target protospacer for Cas9 cleavage."
      },
      {
        type: "formula",
        title: "Cleavage Geometry",
        content: "Blunt DSB is cut exactly 3 base pairs upstream of the PAM sequence."
      },
      {
        type: "warning",
        title: "Exam Trap",
        content: "Both leading and lagging strands are synthesized chemically in the 5' -> 3' direction."
      }
    ],

    checklist: [
      "Diagram the 6 primary enzymes acting at the replication fork",
      "Explain the indispensable role of the PAM sequence in Cas9 binding",
      "Compare NHEJ and HDR repair mechanisms in terms of cell cycle dependence"
    ],

    quiz: [
      {
        question: "What is the primary function of the PAM sequence (5'-NGG-3') in CRISPR-Cas9 gene editing?",
        options: [
          "It transcribes tracrRNA inside bacterial lysosomes.",
          "It is the required recognition motif for Cas9 to bind and unwind target DNA.",
          "It seals Okazaki fragments during lagging strand synthesis.",
          "It phosphorylates DNA Polymerase III."
        ],
        correctIndex: 1,
        explanation: "Cas9 interrogates genomic DNA by binding PAM first; without PAM, target interrogation fails."
      }
    ],

    flashcards: [
      {
        term: "PAM Sequence",
        def: "Protospacer Adjacent Motif (5'-NGG-3') essential for Cas9 target recognition and cleavage."
      },
      {
        term: "Homology-Directed Repair (HDR)",
        def: "High-fidelity DNA repair pathway active during S/G2 phase using a donor template for precise insertion."
      }
    ]
  },
  txt: {
    id: "txt",
    subject: "business",
    domainLabel: "Economics & Finance",
    courseCode: "ECON 102",
    title: "Economics_Transcript.txt",
    rawContent: `TRANSCRIPT: MACROECONOMIC STABILIZATION POLICIES & INFLATION TARGETING
Course: ECON 102 - Principles of Macroeconomics
Document: Economics_Transcript.txt

1. INFLATION MECHANICS AND THE PHILLIPS CURVE
Inflation represents a sustained, generalized increase in the overall price level of goods and services, eroding the purchasing power of currency.
- Demand-Pull Inflation occurs when aggregate demand (AD = C + I + G + NX) exceeds aggregate productive capacity (Y*), commonly summarized as 'too much money chasing too few goods.'
- Cost-Push Inflation occurs when sudden supply shocks (such as geopolitical oil embargos or supply chain bottlenecks) elevate production costs, shifting the Short-Run Aggregate Supply (SRAS) curve leftward, precipitating stagflation (stagnant growth combined with escalating inflation).
- The Phillips Curve historically depicted an inverse empirical relationship between unemployment and wage inflation. However, Milton Friedman and Edmund Phelps proved that the Long-Run Phillips Curve (LRPC) is strictly vertical at the Natural Rate of Unemployment (NAIRU), meaning monetary stimulus cannot permanently drive unemployment below NAIRU without continuously accelerating inflation.

2. CENTRAL BANK MONETARY TOOLS & THE TAYLOR RULE
Central banks (e.g., The Federal Reserve) execute monetary policy through three classical mechanisms:
1. Open Market Operations (OMO): Purchasing government Treasury bonds injects bank reserves, expanding the monetary base and decreasing the federal funds rate; selling bonds contracts liquidity.
2. The Reserve Requirement: The fraction of deposits commercial banks must hold in reserve rather than lend.
3. The Discount Rate: Interest rate charged on direct loans from the central bank's discount window.
- The Taylor Rule provides a normative benchmark for setting the nominal policy interest rate based on the output gap and deviation of inflation from the central bank's 2% target:
i_t = r* + π_t + 0.5(π_t - π*) + 0.5(y_t - y*)
where r* is the neutral real interest rate, π is inflation, and y is real GDP.`,

    tldr: "Inflation arises from demand-pull or supply-shock cost-push pressures. While the short-run Phillips curve shows an inflation-unemployment trade-off, the long-run curve is vertical at NAIRU. Central banks stabilize economies via open market operations and interest rate setting guided by the Taylor Rule.",

    keyConcepts: [
      {
        title: "Demand-Pull vs Cost-Push Inflation",
        points: [
          "Demand-pull: AD outpaces aggregate productive capacity.",
          "Cost-push / supply shocks shift SRAS leftward, creating stagflation."
        ]
      },
      {
        title: "The Natural Rate of Unemployment (NAIRU)",
        points: [
          "Long-Run Phillips Curve is vertical; monetary policy cannot permanently suppress unemployment below NAIRU."
        ]
      },
      {
        title: "Monetary Policy & The Taylor Rule",
        points: [
          "Open market operations adjust bank reserve balances to hit target interest rates.",
          "Taylor Rule prescribes policy rates based on inflation deviations and GDP output gaps."
        ]
      }
    ],

    callouts: [
      {
        type: "definition",
        title: "NAIRU",
        content: "Non-Accelerating Inflation Rate of Unemployment: The specific rate of unemployment at which inflation remains constant."
      },
      {
        type: "formula",
        title: "The Taylor Rule Equation",
        content: "i = r* + π + 0.5(π - π*) + 0.5(y - y*)"
      },
      {
        type: "warning",
        title: "Stagflation Trap",
        content: "Attempting to solve cost-push inflation with expansionary fiscal stimulus exacerbates inflation without fixing underlying supply bottlenecks."
      }
    ],

    checklist: [
      "Derive the difference between Demand-Pull and Cost-Push inflation using AS-AD graphs",
      "Explain why the Long-Run Phillips Curve is vertical at NAIRU",
      "Calculate nominal target rate given inflation and output gaps using Taylor Rule"
    ],

    quiz: [
      {
        question: "Why is the Long-Run Phillips Curve (LRPC) modeled as a vertical line in modern macroeconomic consensus?",
        options: [
          "Inflation is mathematically prohibited from exceeding 2%.",
          "There is no long-run trade-off between inflation and unemployment; employment converges to NAIRU once expectations adjust.",
          "Central banks fix interest rates permanently at zero.",
          "Taxes eliminate consumer spending."
        ],
        correctIndex: 1,
        explanation: "In the long run, inflation expectations fully adapt, meaning monetary stimulus cannot keep unemployment below the natural rate (NAIRU)."
      }
    ],

    flashcards: [
      {
        term: "NAIRU",
        def: "The natural rate of unemployment below which inflation begins to accelerate."
      },
      {
        term: "Taylor Rule",
        def: "Empirical guideline linking central bank target interest rates to inflation deviations and economic output gaps."
      }
    ]
  },
  md: {
    id: "md",
    subject: "cs",
    domainLabel: "Operating Systems Principles",
    courseCode: "CS 301",
    title: "Operating_Systems_Notes.md",
    rawContent: `LECTURE NOTES: MUTUAL EXCLUSION, SEMAPHORES & DEADLOCK PREVENTION
Course: CS 301 - Operating Systems
Document: Operating_Systems_Notes.md

1. SYNCHRONIZATION & CRITICAL SECTIONS
- Mutual Exclusion ensures only one thread enters a critical section.
- Semaphores use wait() [P] and signal() [V] atomic primitives.
- Spinlocks busy-wait on CPU; ideal for brief multicore locks.

2. COFFMAN DEADLOCK CONDITIONS
1. Mutual Exclusion
2. Hold and Wait
3. No Preemption
4. Circular Wait
All four must hold concurrently for a deadlock to occur.

3. VIRTUAL MEMORY & PAGING
- Paging partitions logical memory into pages and physical memory into frames.
- MMU leverages TLB associative cache to avoid DRAM table walks.
- Page faults trap to kernel mode to retrieve missing frames from swap store.`,

    tldr: "Concurrency control requires mutual exclusion, progress, and bounded waiting. Deadlocks occur if and only if all four Coffman conditions hold simultaneously. Virtual memory relies on TLB caching and page tables to map virtual pages to DRAM frames.",

    keyConcepts: [
      {
        title: "Critical Section Criteria",
        points: ["Mutual exclusion, progress, and bounded waiting guarantee race-free thread execution."]
      },
      {
        title: "The 4 Coffman Conditions",
        points: ["Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait."]
      },
      {
        title: "Virtual Memory Paging",
        points: ["TLB accelerates logical-to-physical address translation; missing pages trigger OS page fault traps."]
      }
    ],

    callouts: [
      {
        type: "definition",
        title: "Circular Wait",
        content: "A closed cycle where P0 waits for P1, and P1 waits for P0."
      }
    ],

    checklist: [
      "Recite the 4 Coffman deadlock conditions",
      "Explain how the TLB cache speeds up virtual address resolution"
    ],

    quiz: [
      {
        question: "Which Coffman condition is eliminated by establishing a strict global ordering on resource acquisition?",
        options: [
          "Mutual Exclusion",
          "Circular Wait",
          "No Preemption",
          "Hold and Wait"
        ],
        correctIndex: 1,
        explanation: "Imposing a total numerical order on all resources prevents circular waiting chains from forming."
      }
    ],

    flashcards: [
      {
        term: "Mutual Exclusion",
        def: "Requirement that only one thread can execute in a critical section at any given time."
      }
    ]
  },
  cs: {
    id: "cs",
    subject: "cs",
    domainLabel: "Computer Science & Systems",
    courseCode: "CS 301",
    title: "Operating Systems: Concurrency, Deadlocks & Memory Paging",
    rawContent: `LECTURE 14: CONCURRENCY CONTROL, DEADLOCKS, AND VIRTUAL MEMORY MANAGEMENT
Course: CS 301 - Operating Systems Principles
Instructor: Prof. K. Vance

1. THE CONCURRENCY PROBLEM & CRITICAL SECTIONS
Modern operating systems enable concurrent execution of multiple threads to maximize CPU utilization. However, concurrent access to shared mutable state leads to race conditions—situations where the outcome depends unpredictably on the execution order or interleaving of instructions.

A Critical Section is a segment of code that accesses shared resources (memory, file handles, or network sockets). To prevent race conditions, any valid synchronization solution must satisfy three core criteria:
1. Mutual Exclusion: If thread T1 is executing in its critical section, no other threads can be executing in their critical sections.
2. Progress: If no thread is executing in its critical section and there exist threads wishing to enter, only those threads not executing in their remainder sections can participate in deciding who enters next.
3. Bounded Waiting: A bound must exist on the number of times other threads are allowed to enter their critical sections after a thread has made a request to enter and before that request is granted (preventing starvation).

Semaphores (introduced by Edsger Dijkstra) are integer synchronization variables manipulated atomically via two operations:
- wait() or P(): Decrements the semaphore value S. If S becomes negative, the calling process blocks.
- signal() or V(): Increments the semaphore value S. If there are blocked processes, one is unblocked.

Mutex Locks are binary semaphores (values 0 or 1) with ownership semantics, typically used for mutual exclusion. Spinlocks utilize busy waiting (CPU spinning in a loop) instead of context switching, which is optimal for short critical sections on multi-core architectures.

2. DEADLOCK FORMALIZATION & COFFMAN CONDITIONS
A Deadlock is a state where a set of processes are blocked because each process holds a resource and waits for another resource held by another process in the set.

For a deadlock to occur, four conditions (known as Coffman Conditions) must hold simultaneously:
1. Mutual Exclusion: At least one resource must be held in a non-shareable mode.
2. Hold and Wait: A process must currently hold at least one resource and be waiting to acquire additional resources held by other processes.
3. No Preemption: Resources cannot be preemptively taken away from a process; they can only be released voluntarily after completion.
4. Circular Wait: A closed chain of processes exists such that each process holds at least one resource needed by the next process in the chain (P0 -> P1 -> P2 -> ... -> P0).

Deadlock Handling Strategies:
- Prevention: Invalidate at least one of the four Coffman conditions (e.g., impose total resource ordering to eliminate Circular Wait).
- Avoidance: Ensure the system never enters an 'unsafe state' using dynamic algorithms such as Dijkstra's Banker's Algorithm.
- Detection and Recovery: Allow deadlocks to occur, periodically detect cycles in the Resource Allocation Graph (RAG), and recover via process termination or resource preemption.
- Ignorance (Ostrich Algorithm): Pretend deadlocks never occur; used by most general-purpose OS (Linux, Windows) due to performance trade-offs.

3. VIRTUAL MEMORY & PAGED ALLOCATION
Virtual memory separates user logical memory from physical memory (DRAM), allowing an execution of processes that require more memory than is physically available.
- Paging divides logical memory into fixed-size blocks called Pages, and physical memory into blocks of the same size called Frames (typically 4 KB).
- The Memory Management Unit (MMU) uses the Page Table to translate virtual addresses into physical addresses. A virtual address is partitioned into a Page Number (p) and a Page Offset (d).
- The Translation Lookaside Buffer (TLB) is a fast hardware associative cache that stores recently accessed page table translations to avoid double memory lookups.
- A Page Fault occurs when a program attempts to access a page that is marked invalid or not present in physical RAM. The OS page fault handler traps into kernel mode, allocates a free frame, reads the page from backing store (swap disk/SSD), updates the page table bit to valid, and restarts the instruction.
- Page Replacement Algorithms determine which frame to victimize when RAM is full: FIFO (suffers from Belady's Anomaly), LRU (Least Recently Used - optimal in practice using stack or counter implementations), and Clock / Second-Chance algorithm (an efficient approximation of LRU).`,
    
    tldr: "Concurrency requires mutual exclusion, progress, and bounded waiting to avoid race conditions. Deadlocks occur if and only if all four Coffman conditions hold: Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait. Virtual memory uses fixed-size paging and TLB caching to manage memory, triggering page fault interrupts for disk retrieval when pages are not resident in RAM.",
    
    keyConcepts: [
      {
        title: "Critical Section Problem & Synchronization Primitives",
        points: [
          "Race conditions occur when multiple threads interleave reads and writes to shared memory.",
          "Must satisfy three conditions: Mutual Exclusion, Progress, and Bounded Waiting.",
          "Dijkstra's Semaphores manipulate an atomic integer with wait() [P] and signal() [V].",
          "Spinlocks busy-wait on CPU; ideal for fast multi-core locks where context switch overhead exceeds wait time."
        ]
      },
      {
        title: "The Four Coffman Deadlock Conditions",
        points: [
          "Mutual Exclusion: Resource cannot be shared concurrently.",
          "Hold & Wait: Holding resource while requesting new one.",
          "No Preemption: Resources cannot be forcibly revoked.",
          "Circular Wait: Process cycle P0 holds R0 waiting for R1 held by P1 waiting for R0.",
          "Eliminating Circular Wait is achieved by strictly ordering resource acquisitions (Resource Hierarchy)."
        ]
      },
      {
        title: "Paging, TLB, & Page Fault Traps",
        points: [
          "Logical address = Page Number (p) + Offset (d); Physical address = Frame Number (f) + Offset (d).",
          "TLB hit resolves address in <1ns; TLB miss incurs memory bus latency to inspect page table.",
          "Page fault causes hardware trap: OS allocates free frame, fetches page from swap storage, updates page table valid bit, and restarts instruction.",
          "Belady's Anomaly: For FIFO page replacement, adding more page frames can counterintuitively cause MORE page faults."
        ]
      }
    ],

    callouts: [
      {
        type: "definition",
        title: "Core Definition: Deadlock vs Starvation",
        content: "Deadlock is an irreversible state where a set of processes are blocked waiting for events only other blocked processes can cause. Starvation is indefinite delay where a process never gets scheduled, but the system as a whole continues to make progress."
      },
      {
        type: "formula",
        title: "Effective Memory Access Time (EMAT)",
        content: "EMAT = (TLB Hit Rate × TLB Access Time) + (1 - TLB Hit Rate) × (TLB Access Time + 2 × Memory Access Time)"
      },
      {
        type: "warning",
        title: "Exam Trap: Belady's Anomaly",
        content: "FIFO is susceptible to Belady's Anomaly. Optimal (OPT) and Least Recently Used (LRU) algorithms belong to the class of stack algorithms and NEVER suffer from Belady's Anomaly."
      }
    ],

    checklist: [
      "Define the three requirements of a valid critical section solution",
      "List and recite all four Coffman conditions for deadlock",
      "Explain the difference between Deadlock Prevention and Avoidance (Banker's Algorithm)",
      "Calculate Effective Memory Access Time (EMAT) given TLB hit ratio",
      "Trace a page fault interrupt handling sequence from MMU trap to instruction restart"
    ],

    quiz: [
      {
        question: "Which of the following is NOT one of the four essential Coffman conditions required for a deadlock to occur?",
        options: [
          "Mutual Exclusion",
          "Hold and Wait",
          "Preemptive Scheduling",
          "Circular Wait"
        ],
        correctIndex: 2,
        explanation: "The condition is 'No Preemption'—resources CANNOT be forcibly revoked. Preemptive scheduling actually PREVENTS deadlocks by revoking resources."
      },
      {
        question: "Why does the Ostrich Algorithm remain the predominant deadlock strategy in general-purpose OS like Linux and Windows?",
        options: [
          "It mathematically guarantees 0% deadlock occurrence.",
          "Deadlock avoidance algorithms like Banker's Algorithm incur heavy runtime overhead for rare deadlock conditions.",
          "Modern multi-core processors have dedicated hardware preventing circular waits.",
          "Virtual memory completely eliminates thread race conditions."
        ],
        correctIndex: 1,
        explanation: "Avoidance and continuous detection algorithms carry high runtime overhead. Since deadlocks are rare in well-written software, it is more pragmatic to reboot or kill the offending process."
      },
      {
        question: "What anomaly describes a phenomenon where increasing the number of physical memory frames leads to an INCREASE in page faults under FIFO replacement?",
        options: [
          "Dijkstra's Inversion",
          "Belady's Anomaly",
          "Amdahl's Bottleneck",
          "Thrashing Cascade"
        ],
        correctIndex: 1,
        explanation: "Belady's Anomaly occurs in FIFO page replacement, where allocating more physical page frames causes more page faults. LRU and Optimal algorithms do not suffer from this."
      },
      {
        question: "In Paged Memory Management, what hardware component caches recent virtual-to-physical address mappings to avoid multiple DRAM lookups?",
        options: [
          "Arithmetic Logic Unit (ALU)",
          "Translation Lookaside Buffer (TLB)",
          "Direct Memory Access (DMA) Controller",
          "Interrupt Descriptor Table (IDT)"
        ],
        correctIndex: 1,
        explanation: "The TLB (Translation Lookaside Buffer) is an associative hardware cache inside the MMU that stores recent page-to-frame translations."
      },
      {
        question: "What is the primary operational difference between a Spinlock and a Sleep/Mutex lock?",
        options: [
          "Spinlocks only work on single-core processors.",
          "Spinlocks maintain a queue of suspended processes, whereas Mutexes spin on the CPU.",
          "Spinlocks busy-wait in a loop burning CPU cycles, avoiding the latency of a full OS context switch.",
          "Spinlocks are immune to race conditions without hardware atomic instructions."
        ],
        correctIndex: 2,
        explanation: "Spinlocks repeatedly execute a test-and-set instruction in a tight loop (busy waiting), which is faster than an OS sleep/wake context switch if the critical section is brief."
      }
    ],

    flashcards: [
      {
        term: "Mutual Exclusion",
        def: "Requirement that only one thread/process can execute in its critical section at any single instant in time."
      },
      {
        term: "The Four Coffman Conditions",
        def: "1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption, 4. Circular Wait. All four must hold simultaneously for deadlock."
      },
      {
        term: "Banker's Algorithm",
        def: "A deadlock avoidance algorithm by Dijkstra that simulates resource allocation against maximum declared claims to test for a safe state."
      },
      {
        term: "Page Fault",
        def: "A hardware interrupt triggered by the MMU when a program attempts to access a virtual memory page not present in physical RAM."
      },
      {
        term: "Thrashing",
        def: "A catastrophic state where an OS spends more time swapping pages in and out of disk than executing instructions, caused by insufficient memory frames."
      }
    ]
  },

  bio: {
    id: "bio",
    subject: "bio",
    domainLabel: "Medical & Life Sciences",
    courseCode: "BIO 204",
    title: "Molecular Genetics: DNA Replication, CRISPR-Cas9 & Gene Editing",
    rawContent: `LECTURE 08: MOLECULAR GENETICS AND TARGETED GENE EDITING
Course: BIO 204 - Cell & Molecular Biology
Instructor: Dr. S. Ramanujan

1. THE CENTRAL DOGMA & DNA REPLICATION FORK
The flow of genetic information inside biological systems proceeds from DNA -> RNA (Transcription) -> Protein (Translation).
During S-phase of the eukaryotic cell cycle, DNA replicates semi-conservatively (demonstrated by Meselson & Stahl in 1958).

Key Enzymes at the Replication Fork:
- DNA Helicase: Unwinds the double helix by breaking hydrogen bonds between complementary base pairs (Adenine-Thymine with 2 H-bonds, Guanine-Cytosine with 3 H-bonds).
- Single-Stranded Binding Proteins (SSBs): Stabilize single-stranded DNA to prevent re-annealing.
- Topoisomerase (DNA Gyrase in prokaryotes): Relieves torsional strain and supercoiling ahead of the replication fork by transiently cutting and re-ligating the phosphodiester backbone.
- RNA Primase: Synthesizes a short complementary RNA primer (~10-12 nucleotides) providing a free 3'-hydroxyl (-OH) group.
- DNA Polymerase III (in bacteria) / DNA Pol δ and ε (in eukaryotes): Synthesizes nascent DNA strictly in the 5' -> 3' direction.
- Leading Strand: Synthesized continuously toward the replication fork.
- Lagging Strand: Synthesized discontinuously away from the fork as discrete Okazaki fragments.
- DNA Polymerase I: Removes RNA primers via 5' -> 3' exonuclease activity and fills gaps with deoxynucleotides.
- DNA Ligase: Catalyzes the formation of phosphodiester bonds between adjacent 3'-OH and 5'-phosphate groups, sealing the nick.

2. CRISPR-CAS9 ADAPTIVE IMMUNITY AND GENE EDITING
CRISPR (Clustered Regularly Interspaced Short Palindromic Repeats) was originally discovered as an adaptive immune system in bacteria and archaea against bacteriophage viral infections.

Mechanism of Bacterial CRISPR Defense:
1. Adaptation: Cas1-Cas2 protein complexes capture viral DNA fragments (protospacers) and integrate them into the host CRISPR genomic locus.
2. crRNA Biogenesis: The CRISPR array is transcribed into a precursor crRNA (pre-crRNA) and processed into short mature crRNAs.
3. Interference: Cas9 endonuclease forms a ribonucleoprotein (RNP) complex with crRNA and tracrRNA (trans-activating crRNA).
- Single Guide RNA (sgRNA): Engineered synthetic fusion of crRNA and tracrRNA (~100 nucleotides).
- PAM (Protospacer Adjacent Motif): Essential short sequence (5'-NGG-3' for Streptococcus pyogenes Cas9) located directly downstream of the target DNA sequence. Cas9 will NOT bind or cleave DNA without PAM recognition.
- Cleavage: Cas9 utilizes two distinct catalytic nuclease domains:
  * RuvC domain cleaves the non-complementary strand.
  * HNH domain cleaves the complementary strand.
  * Result: A targeted Double-Stranded Break (DSB) 3 base pairs upstream of the PAM site.

3. CELLULAR REPAIR PATHWAYS & THERAPEUTIC APPLICATIONS
Following Cas9-induced DSB, eukaryotic cells invoke one of two primary DNA repair pathways:
- Non-Homologous End Joining (NHEJ): Error-prone, active throughout all cell cycle stages. Directly ligates broken ends, frequently introducing insertions or deletions (indels) causing frameshifts that knock out gene function.
- Homology-Directed Repair (HDR): High-fidelity, occurs primarily during S and G2 phases when a sister chromatid or exogenous repair donor template with homologous flanking arms is present. Enables precision gene insertion or point-mutation correction.`,

    tldr: "DNA replication is semi-conservative and directional (5' to 3'), requiring helicase, primase, polymerases, and ligase to produce leading and lagging (Okazaki) strands. CRISPR-Cas9 is a bacterial immune mechanism repurposed for genome engineering: guided by sgRNA and PAM (5'-NGG) recognition, Cas9 induces targeted double-stranded breaks repaired by either error-prone NHEJ (gene knockout) or precise HDR (gene editing).",

    keyConcepts: [
      {
        title: "Replication Machinery & Okazaki Fragment Processing",
        points: [
          "DNA synthesis must proceed 5' -> 3' because DNA Polymerase requires a free 3'-OH group to attack incoming dNTPs.",
          "Topoisomerase relieves supercoiling tension; Helicase unzips hydrogen bonds.",
          "Lagging strand requires repeated RNA primase initiations, creating Okazaki fragments later stitched by DNA Ligase."
        ]
      },
      {
        title: "CRISPR-Cas9 Mechanism: sgRNA, PAM & Cleavage",
        points: [
          "sgRNA combines crRNA (target-matching 20nt sequence) and tracrRNA (Cas9 structural handle).",
          "PAM (5'-NGG-3') is indispensable; Cas9 probes DNA for PAM before unwinding the duplex.",
          "Cas9 nuclease domains: HNH cleaves target strand; RuvC cleaves non-target strand, leaving a blunt double-strand break."
        ]
      },
      {
        title: "NHEJ vs HDR DNA Repair Pathways",
        points: [
          "NHEJ operates in all cell cycle phases; introduces random indels to achieve gene knockouts.",
          "HDR requires an exogenous donor DNA template with homologous homology arms to introduce precise sequence replacements.",
          "HDR is restricted to S/G2 phases when cellular homologous recombination proteins (RAD51, BRCA1/2) are active."
        ]
      }
    ],

    callouts: [
      {
        type: "definition",
        title: "The PAM Sequence (Protospacer Adjacent Motif)",
        content: "A 2-6 base pair DNA sequence immediately following the Cas9-targeted DNA sequence (5'-NGG for SpCas9). Crucially, the bacterial host's own CRISPR array lacks PAM, preventing self-cleavage."
      },
      {
        type: "formula",
        title: "Base Pairing Energetics",
        content: "Adenine = Thymine (2 Hydrogen Bonds); Guanine ≡ Cytosine (3 Hydrogen Bonds). High G-C content increases melting temperature (Tm)."
      },
      {
        type: "warning",
        title: "Exam Trap: Leading vs Lagging Strand Direction",
        content: "Both strands are synthesized chemically in the 5' to 3' direction. The difference is only relative to the replication fork direction: leading moves TOWARD the fork, lagging moves AWAY from it."
      }
    ],

    checklist: [
      "Diagram the replication fork and label all 6 primary enzymatic complexes",
      "Explain why DNA Polymerase cannot initiate de novo strand synthesis without an RNA primer",
      "Define the PAM site and explain how bacteria protect their own CRISPR array from Cas9 cleavage",
      "Compare NHEJ and HDR repair mechanisms in terms of fidelity and cell cycle dependence",
      "Identify the specific nuclease catalytic domains of Cas9 (RuvC and HNH)"
    ],

    quiz: [
      {
        question: "Why does DNA Polymerase strictly require an RNA primer synthesized by Primase before it can begin polymerizing DNA?",
        options: [
          "It needs ATP provided exclusively by ribonucleotides.",
          "It cannot initiate synthesis de novo; it requires a free 3'-OH group to form a phosphodiester bond.",
          "It must dissolve histone proteins prior to reading DNA.",
          "RNA primers permanently mark the leading strand for histone methylation."
        ],
        correctIndex: 1,
        explanation: "DNA Polymerase cannot start a strand from scratch—it can only extend an existing chain by adding dNTPs to an existing free 3'-hydroxyl (-OH) group provided by the RNA primer."
      },
      {
        question: "What is the function of the PAM (Protospacer Adjacent Motif) sequence in Streptococcus pyogenes Cas9 gene editing?",
        options: [
          "It triggers transcription of the sgRNA inside the nucleus.",
          "It serves as an essential recognition motif (5'-NGG-3') without which Cas9 will not bind or cleave target DNA.",
          "It repairs double-stranded breaks via homologous recombination.",
          "It phosphorylates the Cas9 protein to activate its nuclear localization signal."
        ],
        correctIndex: 1,
        explanation: "Cas9 interrogates genomic DNA by first binding the PAM site (5'-NGG-3'). Without PAM recognition, Cas9 cannot unwind or cleave the adjacent target DNA."
      },
      {
        question: "Which cellular DNA repair pathway is primarily responsible for generating targeted gene 'knockouts' through frame-shifting insertions/deletions (indels)?",
        options: [
          "Homology-Directed Repair (HDR)",
          "Non-Homologous End Joining (NHEJ)",
          "Nucleotide Excision Repair (NER)",
          "Mismatch Repair (MMR)"
        ],
        correctIndex: 1,
        explanation: "NHEJ is an error-prone repair mechanism that directly pastes broken DNA ends together, frequently introducing insertions or deletions that disrupt the open reading frame."
      },
      {
        question: "Which enzyme relieves the torsional strain and positive supercoiling created ahead of the advancing DNA replication fork?",
        options: [
          "DNA Helicase",
          "Single-Stranded Binding Protein (SSB)",
          "Topoisomerase (DNA Gyrase)",
          "DNA Ligase"
        ],
        correctIndex: 2,
        explanation: "Topoisomerase cuts one or both DNA strands, allows them to swivel to relieve torsional supercoiling stress, and reseals the backbone."
      },
      {
        question: "Which two catalytic nuclease domains of the SpCas9 protein are responsible for cleaving the complementary and non-complementary DNA strands?",
        options: [
          "Zinc-Finger and TALEN domains",
          "HNH and RuvC domains",
          "Kinase and Phosphatase domains",
          "Polymerase and Exonuclease domains"
        ],
        correctIndex: 1,
        explanation: "Cas9 contains two distinct nuclease domains: HNH cleaves the DNA strand complementary to the guide RNA, while RuvC cleaves the non-complementary strand."
      }
    ],

    flashcards: [
      {
        term: "Semi-Conservative Replication",
        def: "Each daughter DNA molecule consists of one original parental strand and one newly synthesized strand."
      },
      {
        term: "Okazaki Fragments",
        def: "Short, newly synthesized DNA fragments formed on the lagging template strand during replication, later sealed by DNA ligase."
      },
      {
        term: "sgRNA (Single Guide RNA)",
        def: "An engineered chimeric fusion of crRNA (targeting 20nt sequence) and tracrRNA (scaffold for Cas9 binding)."
      },
      {
        term: "Homology-Directed Repair (HDR)",
        def: "High-fidelity DNA repair pathway active during S/G2 phase that utilizes a homologous donor DNA template for precise gene insertions."
      },
      {
        term: "DNA Ligase",
        def: "Enzyme that seals nicks in the phosphodiester backbone by catalyzing the bond between a 3'-OH group and a 5'-phosphate group."
      }
    ]
  },

  ai: {
    id: "ai",
    subject: "cs",
    domainLabel: "Artificial Intelligence & ML",
    courseCode: "AI 402",
    title: "Deep Learning: Backpropagation, Gradient Descent & Optimization",
    rawContent: `LECTURE 05: LOSS OPTIMIZATION, BACKPROPAGATION, AND GRADIENT DYNAMICS
Course: AI 402 - Advanced Deep Learning
Instructor: Prof. A. Chen

1. ARTIFICIAL NEURAL NETWORKS & FORWARD PROPAGATION
A multilayer perceptron (MLP) consists of an input layer, one or more hidden layers, and an output layer.
Each neuron j computes a linear combination of its inputs followed by a non-linear activation function σ:
z_j = ∑ (w_ij · x_i) + b_j
a_j = σ(z_j)

Non-linear activation functions are indispensable; without them, stacking multiple layers collapses mathematically into a single linear transformation (W2 · W1 · x = W_combined · x).
Common Activations:
- Sigmoid: σ(z) = 1 / (1 + e^-z). Output in (0, 1). Saturates for large |z|, causing vanishing gradients (derivative max is 0.25).
- Tanh: Output in (-1, 1), zero-centered. Still suffers from vanishing gradients.
- ReLU (Rectified Linear Unit): f(z) = max(0, z). Derivative is 1 for z > 0, preventing vanishing gradients in deep networks. Prone to 'Dying ReLU' if neurons get stuck with negative inputs.
- Leaky ReLU / GELU: Smooth variants mitigating dying ReLU.

2. LOSS FUNCTIONS & GRADIENT DESCENT OPTIMIZATION
The loss function L(θ) quantifies prediction error:
- Mean Squared Error (MSE) for regression: L = (1/2N) ∑ ||y - ŷ||²
- Binary Cross-Entropy (BCE) for binary classification: L = -[y log ŷ + (1-y) log (1-ŷ)]
- Categorical Cross-Entropy with Softmax for multi-class classification.

Gradient Descent updates parameters in the direction of steepest descent:
θ_{t+1} = θ_t - η ∇_θ L(θ_t)
where η is the learning rate.

Variants of Gradient Descent:
1. Batch GD: Computes gradients over the entire training set. Stable but computationally prohibitive for large datasets.
2. Stochastic GD (SGD): Updates parameters per individual training example. Fast but noisy trajectory.
3. Mini-batch GD: Computes gradients over batches of size B (typically 32 to 256). Best trade-off of hardware vectorization and gradient stability.

Advanced Optimizers:
- Momentum: Accumulates an exponentially decaying moving average of past gradients to dampen oscillations in ravine-like loss surfaces: v_t = γ v_{t-1} + η ∇L.
- RMSprop: Scales learning rate inversely by the square root of running average of squared gradients, adapting per-parameter learning rates.
- Adam (Adaptive Moment Estimation): Combines Momentum (first moment estimation, mean) and RMSprop (second moment estimation, uncentered variance) with bias-correction factors for initial steps.

3. THE BACKPROPAGATION ALGORITHM & COMPUTATIONAL GRAPHS
Backpropagation is the application of the multivariable calculus chain rule to compute partial derivatives of loss L with respect to every weight w_ij and bias b_j efficiently in O(N) operations.

Reverse-Mode Automatic Differentiation:
1. Forward Pass: Compute and cache intermediate activations a_l and pre-activations z_l from input to output layer.
2. Loss Calculation: Compute scalar loss L(y, ŷ).
3. Backward Pass: Propagate error signal δ_l backward starting from output layer:
δ_L = ∇_a L ⊙ σ'(z_L)
δ_l = ((W_{l+1})^T · δ_{l+1}) ⊙ σ'(z_l)
∂L / ∂W_l = δ_l · (a_{l-1})^T
∂L / ∂b_l = δ_l

Vanishing and Exploding Gradients:
As error signals are multiplied through L layers via chain rule, if eigenvalues of weight matrices are < 1, gradients diminish exponentially toward zero (vanishing gradient). If eigenvalues > 1, gradients blow up to NaN (exploding gradient). Solutions include He/Xavier weight initialization, Batch Normalization, Layer Normalization, Residual Connections (Skip Connections in ResNets), and Gradient Clipping.`,

    tldr: "Deep learning networks combine linear matrix projections with non-linear activation functions (ReLU, GELU) to model complex mappings. Parameters are learned via backpropagation, which leverages reverse-mode chain rule calculus to calculate exact gradients. Advanced adaptive optimizers like Adam combine momentum and squared gradient scaling to navigate complex non-convex loss surfaces while techniques like residual connections and normalization resolve vanishing gradients.",

    keyConcepts: [
      {
        title: "The Non-Linearity Requirement & Activation Functions",
        points: [
          "Linear layers without activations collapse mathematically into a single matrix product.",
          "Sigmoid and Tanh suffer from vanishing gradients when saturating in deep architectures.",
          "ReLU max(0, z) maintains gradient of 1 for positive activations, enabling training of very deep networks."
        ]
      },
      {
        title: "Optimization Dynamics: SGD, Momentum & Adam",
        points: [
          "Standard SGD suffers in ravines with steep walls and gentle slopes.",
          "Momentum incorporates historical velocity to power through plateaus and smooth zig-zagging.",
          "Adam tracks both 1st moment (mean gradient) and 2nd moment (variance) with initialization bias correction."
        ]
      },
      {
        title: "Backpropagation via Reverse-Mode Chain Rule",
        points: [
          "Calculates exact analytical gradients ∂L/∂W in O(weights) time rather than O(weights²).",
          "Caches activations during forward pass, then flows error vector δ backwards from output to input.",
          "Mitigating vanishing gradients requires Xavier/He initialization, LayerNorm, and ResNet skip connections."
        ]
      }
    ],

    callouts: [
      {
        type: "formula",
        title: "Adam Parameter Update Formula",
        content: "m_t = β1 m_{t-1} + (1-β1) g_t;  v_t = β2 v_{t-1} + (1-β2) g_t²;  θ_t = θ_{t-1} - η (m̂_t / (√v̂_t + ε))"
      },
      {
        type: "definition",
        title: "Vanishing Gradient Problem",
        content: "When calculating gradients via chain rule through deep layers, repeated multiplication by small derivatives (e.g., Sigmoid derivative ≤ 0.25) causes the gradient to shrink exponentially to near-zero."
      },
      {
        type: "warning",
        title: "Residual Connections (Skip Connections)",
        content: "ResNet skip connections (y = F(x) + x) provide a highway for identity gradient flow (∂y/∂x = ∂F/∂x + 1), allowing deep gradients to backpropagate unimpeded without decay."
      }
    ],

    checklist: [
      "Prove why a multi-layer neural network with pure linear activations collapses to a single linear layer",
      "Write out the forward pass and backward pass equations for a single neuron",
      "Compare the update equations for Momentum, RMSprop, and Adam optimizers",
      "Explain how Batch Normalization and ResNet skip connections resolve vanishing gradients",
      "Identify the derivative maximum of the Sigmoid function (0.25) and explain its impact on deep networks"
    ],

    quiz: [
      {
        question: "Why would a 100-layer deep neural network fail to learn complex non-linear functions if ALL activation functions were set to identity f(x) = x?",
        options: [
          "The matrix dimensions would not match between layers.",
          "The composition of any number of linear transformations is mathematically equivalent to a single linear transformation.",
          "The loss function would automatically evaluate to zero.",
          "The learning rate would need to be negative."
        ],
        correctIndex: 1,
        explanation: "Linear algebra dictates that W2(W1(x)) = (W2 · W1)x = W_single(x). Without non-linear activations, depth adds zero representational expressiveness."
      },
      {
        question: "In the Adam optimizer, what role does the second moment vector (v_t) play during parameter updates?",
        options: [
          "It reverses the gradient direction when encountering saddle points.",
          "It keeps an exponentially decaying average of squared gradients to scale down steps on parameters with large gradients.",
          "It adds Gaussian noise to escape local minima.",
          "It calculates the exact Hessian matrix of second derivatives."
        ],
        correctIndex: 1,
        explanation: "v_t is the running average of squared gradients (uncentered variance). Dividing by √v_t adapts learning rates per-parameter, dampening parameters that experience extreme volatility."
      },
      {
        question: "How do Residual Connections (Skip Connections, y = F(x) + x) in ResNets fundamentally prevent the vanishing gradient problem in 100+ layer architectures?",
        options: [
          "They multiply all gradients by a factor of 10 during the backward pass.",
          "They convert all activation functions from ReLU to Sigmoid.",
          "The derivative ∂y/∂x = ∂F/∂x + 1 ensures an identity gradient term (+1) that allows error signals to backpropagate without exponential decay.",
          "They eliminate the need for backpropagation entirely."
        ],
        correctIndex: 2,
        explanation: "Because y = F(x) + x, applying the chain rule gives ∂y/∂x = ∂F/∂x + 1. The constant '+1' allows gradients to flow directly through the skip connection to earlier layers without multiplying by decaying weights."
      },
      {
        question: "What is the computational complexity of computing gradients for all parameters in a neural network using Backpropagation (Reverse-Mode AutoDiff)?",
        options: [
          "O(2^N) exponential time",
          "O(N) linear in the number of network operations/weights",
          "O(N³) cubic matrix inversion time",
          "O(log N) logarithmic time"
        ],
        correctIndex: 1,
        explanation: "Reverse-mode automatic differentiation (backpropagation) computes exact gradients with respect to all parameters in a constant multiple of the forward pass time, O(N)."
      },
      {
        question: "What major disadvantage does the standard Sigmoid activation function σ(z) = 1 / (1 + e^-z) exhibit in deep feed-forward networks?",
        options: [
          "Its derivative is unbounded and causes exploding gradients.",
          "It is non-differentiable at z = 0.",
          "Its maximum derivative is only 0.25, and it saturates at extreme values, causing gradients to vanish when chained across multiple layers.",
          "It can only accept positive floating point values."
        ],
        correctIndex: 2,
        explanation: "The derivative σ'(z) = σ(z)(1 - σ(z)) reaches a maximum of only 0.25 at z=0 and quickly drops to ~0 for large |z|. In deep networks, multiplying these fractions causes gradients to vanish."
      }
    ],

    flashcards: [
      {
        term: "Vanishing Gradient",
        def: "Exponential decrease of gradient magnitude through layers during backpropagation, causing early layers to train exceedingly slowly or stall."
      },
      {
        term: "Adam Optimizer",
        def: "Adaptive moment estimation combining momentum (1st moment, gradient direction) and RMSprop (2nd moment, adaptive step scaling)."
      },
      {
        term: "ReLU (Rectified Linear Unit)",
        def: "Activation function f(z) = max(0, z) with constant derivative of 1 for positive inputs, preventing gradient saturation."
      },
      {
        term: "Residual Connection (Skip Connection)",
        def: "Architectural shortcut passing input x directly to layer output (y = F(x) + x), allowing uninterrupted identity gradient flow."
      },
      {
        term: "Backpropagation",
        def: "Reverse-mode computational graph execution utilizing the chain rule to compute partial derivatives of loss with respect to all trainable parameters."
      }
    ]
  }
};
