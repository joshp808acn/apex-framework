/**
 * APEX Framework — data.js
 * Single source of truth for all framework content.
 * Edit this file to update principles, failure modes, vendor questions, and journey stages.
 *
 * Structure:
 *   APEX.principles  — seven framework conditions (used by framework.html)
 *   APEX.journey     — six patient journey stages (used by journey.html)
 *   APEX.meta        — framework title, tagline, and summary copy
 *
 * Each principle contains:
 *   definition         — one-sentence system condition (shown in header below principle name)
 *   overview.moments   — array of 3 interaction moments across different clinical contexts
 *   overview.impact    — system-level impact statement
 *   overview.ifFails   — consequence if condition is not met
 */

const APEX = {

  meta: {
    name: "APEX",
    title: "Experience conditions for patient-facing AI",
    tagline: "These principles are not user experience preferences. They are system conditions that determine whether people can interpret guidance correctly and act on it safely.",
    summary: "APEX defines the experience conditions that must be engineered into the health system so people can make safe decisions when AI becomes the first point of contact.",
    frameworkIntro: "Select a principle to explore its definition, documented failure modes, and the vendor assessment questions that should be asked before any procurement decision.",
    journeyIntro: "Select a stage to see which APEX conditions are load-bearing at that moment — and where the failure modes concentrate."
  },

  principles: [

    {
      id: "clarity",
      number: "01",
      name: "Clarity",
      definition: "Ensure guidance can be understood immediately and acted on confidently, even under stress or uncertainty.",

      overview: {
        moments: [
          {
            context: "Telephone triage — adult caller",
            text: "A caller hears a single clear instruction in plain language: \"You should seek medical care tonight. The nearest clinic is open until midnight.\" No ambiguity about urgency. No ambiguity about where to go."
          },
          {
            context: "Aged care — after-hours concern",
            text: "A residential care worker calling about a deteriorating resident receives a stepped response: \"This needs a nurse assessment now. Do not wait until morning. Call the on-call number I'm about to give you.\" The action is unambiguous and sequenced."
          },
          {
            context: "Mental health — distressed caller",
            text: "A caller in emotional distress is not asked to navigate a menu or confirm their details before receiving guidance. The system recognises the presentation and opens with: \"I'm here. Tell me what's happening.\" Clarity begins with not creating friction before the person can speak."
          }
        ],
        impact: "Clear guidance reduces hesitation and decision errors, improving adherence to recommended care pathways.",
        ifFails: "Ambiguous instructions under clinical stress can cause delayed care, inappropriate self-management, or abandonment of the interaction entirely — with direct patient safety consequences."
      },

      failures: [
        {
          name: "LLM hallucination",
          context: "Generative AI documentation",
          breakdown: "The model generates plausible but factually incorrect information — clinical detail that sounds credible but has no basis in the patient's actual presentation.",
          consequence: "Patients receive and may act on guidance derived from fabricated clinical data, creating incorrect treatment pathways.",
          source: "ACN Position Statement, pp. 6–7"
        },
        {
          name: "Visual cue deprivation",
          context: "Telephone triage",
          breakdown: "Assessment proceeds without facial expressions, body language, or physical non-verbal signals, removing key inputs that normally shape how symptoms are interpreted.",
          consequence: "Significant increase in misinterpretation risk at the highest-stakes clinical decision points — particularly for pain, distress, and severity.",
          source: "Huddleston Dissertation, pp. 1, 7"
        },
        {
          name: "Validity and reliability gap",
          context: "AI training on uncontrolled data",
          breakdown: "Algorithms process unverified or biased training data to produce clinical outputs, without adequate validation against the intended population.",
          consequence: "Suboptimal health outcomes and departure from evidence-based practice standards.",
          source: "ACN Position Statement, p. 7"
        }
      ],

      vendor: [
        {
          tag: "capability",
          label: "Capability",
          question: "How does the system adapt its language complexity in real time based on the caller's demonstrated health literacy or comprehension?",
          intent: "Tests whether readability is dynamic or fixed at design time."
        },
        {
          tag: "evidence",
          label: "Evidence",
          question: "What validation has been done to confirm that guidance outputs are understood by people under stress — not just in usability testing conditions?",
          intent: "Distinguishes lab evidence from real-world evidence."
        },
        {
          tag: "governance",
          label: "Governance",
          question: "Who reviews outputs for plain language compliance, how often, and what triggers a review?",
          intent: "Identifies whether clarity is governed or assumed."
        },
        {
          tag: "accountability",
          label: "Accountability",
          question: "If a patient misunderstands guidance and delays seeking care, what is your liability position and how is that documented in the contract?",
          intent: "Surfaces how risk is allocated between vendor and organisation."
        }
      ],

      explorePrompt: "What are the contractual and liability implications for health organisations when a vendor's AI system produces guidance that is misunderstood by a patient?",
      failurePrompt: "What governance controls should health organisations require to detect and respond to LLM hallucination in patient-facing clinical AI?"
    },

    {
      id: "relevance",
      number: "02",
      name: "Relevance",
      definition: "Ensure guidance reflects the person's real situation so recommended actions are practical and achievable.",

      overview: {
        moments: [
          {
            context: "Regional Queensland — limited local services",
            text: "A caller from a town three hours from the nearest hospital is directed to the nearest available after-hours service confirmed open — not the closest one on a static list that closed six months ago."
          },
          {
            context: "Paediatric caller — parent with young child",
            text: "A parent calling about a two-year-old with a high fever is not given advice calibrated to an adult presentation. The system recognises the patient's age from the first exchange and adjusts both its clinical thresholds and recommended care pathway accordingly."
          },
          {
            context: "Remote First Nations community",
            text: "A caller in a remote community is not directed to a service requiring a two-day journey as the first option. The system knows the local health service profile, current availability, and telehealth options — and leads with what is actually accessible."
          }
        ],
        impact: "Relevant guidance increases compliance and reduces delays caused by impractical or unavailable options.",
        ifFails: "Generic or context-blind recommendations erode trust and create dangerous gaps — patients who receive advice they cannot act on often disengage from care entirely."
      },

      failures: [
        {
          name: "Data and algorithmic bias",
          context: "AI trained on non-representative data",
          breakdown: "Systems trained on historically skewed datasets embed gender, racial, and population inequities directly into their outputs — at scale and without visibility to the patient.",
          consequence: "Delivery of discriminatory clinical recommendations that perpetuate existing health inequities rather than correcting them.",
          source: "ACN Position Statement, pp. 2, 8"
        },
        {
          name: "Culturally influenced symptom misinterpretation",
          context: "Telephone triage and remote clinical interviews",
          breakdown: "Cultural backgrounds shape how patients describe symptoms. The same clinical condition is expressed in fundamentally different ways across cultures — ways AI systems trained on narrow datasets cannot reliably interpret.",
          consequence: "Clinical misinterpretation leads to incorrect triage priority or delayed access to care for populations already underserved.",
          source: "Huddleston Dissertation, pp. 1, 126"
        }
      ],

      vendor: [
        {
          tag: "capability",
          label: "Capability",
          question: "How does the system incorporate real-time service availability data — including after-hours, regional, and specialist services — into its recommendations?",
          intent: "Tests whether service data is live or static."
        },
        {
          tag: "capability",
          label: "Capability",
          question: "How is the system trained or configured to account for the specific geography, demographics, and service landscape of our patient population?",
          intent: "Distinguishes generic deployment from contextualised implementation."
        },
        {
          tag: "evidence",
          label: "Evidence",
          question: "Can you provide evidence that recommendation relevance has been validated across rural, remote, and culturally and linguistically diverse populations — not just metropolitan cohorts?",
          intent: "Probes equity gaps in validation."
        },
        {
          tag: "governance",
          label: "Governance",
          question: "What is your process for updating service directory data, and who is accountable when a patient is directed to a service that is unavailable?",
          intent: "Identifies data currency ownership."
        }
      ],

      explorePrompt: "How should health organisations contractually require vendors to maintain service directory accuracy, and what audit rights should they retain?",
      failurePrompt: "How should health organisations audit a vendor's AI system for demographic and cultural bias before deployment in a diverse patient population?"
    },

    {
      id: "timeliness",
      number: "03",
      name: "Timeliness",
      definition: "Ensure responses arrive quickly enough to support decision making in the moment of need.",

      overview: {
        moments: [
          {
            context: "Telephone triage — standard interaction",
            text: "The system responds within 1.5 seconds of the caller finishing their sentence — maintaining the natural rhythm of conversation and signalling active engagement. There is no silence the caller has to interpret."
          },
          {
            context: "High-acuity presentation — suspected cardiac event",
            text: "A caller describing chest pain and left arm numbness does not wait through processing delays. The system flags urgency within the first exchange: \"I need you to call 000 now. Stay on this line until they answer.\""
          },
          {
            context: "After-hours — parent considering ED",
            text: "A parent considering whether to drive to the ED at 2am receives a triage response fast enough to be useful in that moment — not after anxiety has already escalated the decision for them."
          }
        ],
        impact: "Timely responses reduce abandonment and prevent unnecessary escalation driven by uncertainty.",
        ifFails: "Latency in a clinical triage context is not a usability inconvenience — it is a patient safety variable. Delays signal unreliability and can drive callers to escalate unnecessarily or disengage and not seek care at all."
      },

      failures: [
        {
          name: "Safety reporting lag",
          context: "AI-enabled medical device monitoring",
          breakdown: "A synthesis of 266 safety reports found only 4% were classified as near-misses where intervention prevented harm — indicating that failures are predominantly detected after the fact, not in time to prevent them.",
          consequence: "16% of identified failures were associated with actual patient harm. The system governing safety is reactive, not preventive.",
          source: "ACN Position Statement, p. 4"
        },
        {
          name: "Communication fatigue degrading response speed",
          context: "Extended remote clinical assessment",
          breakdown: "Prolonged non-visual verbal engagement creates a form of professional exhaustion that reduces clinician attentiveness and response speed over the course of a shift.",
          consequence: "Dangerous delays in clinical judgement during time-sensitive triage encounters — with the risk compounding as shift length increases.",
          source: "Huddleston Dissertation, pp. 9–10"
        }
      ],

      vendor: [
        {
          tag: "capability",
          label: "Capability",
          question: "What is your guaranteed maximum response latency under peak load conditions, and how is peak load defined in the SLA?",
          intent: "Tests whether performance standards are real or nominal."
        },
        {
          tag: "evidence",
          label: "Evidence",
          question: "What does your performance data show for response latency during actual high-demand periods — not average load?",
          intent: "Distinguishes average performance from worst-case performance."
        },
        {
          tag: "governance",
          label: "Governance",
          question: "What real-time monitoring exists for latency degradation, who is alerted when thresholds are breached, and what is the escalation path?",
          intent: "Tests whether latency is actively governed or retrospectively reported."
        },
        {
          tag: "accountability",
          label: "Accountability",
          question: "If latency failure during a high-acuity interaction contributes to patient harm, how is that incident investigated and what contractual remedies apply?",
          intent: "Surfaces accountability structure for infrastructure failures with clinical consequences."
        }
      ],

      explorePrompt: "What SLA terms should health organisations insist on for AI system response timeliness, and how should these differ by clinical acuity level?",
      failurePrompt: "What real-time monitoring architecture should health organisations require vendors to implement to detect timeliness failures before they become clinical safety events?"
    },

    {
      id: "continuity",
      number: "04",
      name: "Continuity",
      definition: "Ensure information and context move with the person so interactions progress without repetition or delay.",

      overview: {
        moments: [
          {
            context: "AI to clinician handoff",
            text: "When the caller is transferred, the clinician begins already aware of presenting symptoms, duration, risk indicators, and flags raised. Their first words are: \"I can see you've been describing chest tightness for about twenty minutes\" — not \"Can you tell me why you're calling?\""
          },
          {
            context: "Multi-session — callback with worsening symptoms",
            text: "A caller who was assessed two days ago and has called back is not treated as a new contact. The system has the prior context: \"You called on Tuesday about your breathing. Has something changed?\" The patient does not have to re-establish their history before receiving appropriate assessment."
          },
          {
            context: "Cross-channel — web to phone",
            text: "A patient who began a symptom check on the website and then called the triage line finds their information has already transferred. The clinician has a structured summary of what the patient entered online, including symptom onset and severity scoring."
          }
        ],
        impact: "Continuity shortens assessment time and allows clinicians to focus on care rather than information gathering.",
        ifFails: "When context is lost at handoff, clinicians must re-gather information under time pressure — increasing cognitive load, extending time to care, and creating conditions for assessment errors."
      },

      failures: [
        {
          name: "Professional practice standards void",
          context: "AI-integrated nursing and clinical workflows",
          breakdown: "No established professional practice standards currently exist for AI use in nursing. Without them, care delivery is non-standardised — varying by individual clinician rather than governed protocol.",
          consequence: "Departures from evidence-based practice become invisible and unauditable. Harm may occur but cannot be systematically attributed or corrected.",
          source: "ACN Position Statement, pp. 4, 7"
        },
        {
          name: "Workforce AI capability gap",
          context: "Undergraduate and in-service clinical training",
          breakdown: "Digital health and AI competencies are not integrated into nursing curricula, leaving the workforce unable to reliably manage, interrogate, or override AI-generated handoff information.",
          consequence: "A persistent skills deficit that means continuity of care depends on individual adaptation rather than system design.",
          source: "ACN Position Statement, pp. 4, 7"
        }
      ],

      vendor: [
        {
          tag: "capability",
          label: "Capability",
          question: "Exactly what information is captured, structured, and passed at the point of handoff to a clinician — and in what format does the clinician receive it?",
          intent: "Tests whether handoff is genuinely structured or just a transcript."
        },
        {
          tag: "capability",
          label: "Capability",
          question: "How does the system handle multi-session or multi-channel continuity — if a patient calls back, uses a web channel, or presents in person?",
          intent: "Probes the scope of continuity beyond a single call."
        },
        {
          tag: "evidence",
          label: "Evidence",
          question: "What evidence do you have that clinicians actually use and trust the handoff summaries your system generates, rather than re-taking history regardless?",
          intent: "Tests real-world adoption versus designed intent."
        },
        {
          tag: "governance",
          label: "Governance",
          question: "Who is responsible for the clinical accuracy of the handoff summary — your system, the organisation, or the receiving clinician?",
          intent: "Identifies where accountability for summary accuracy sits."
        }
      ],

      explorePrompt: "How should health organisations govern the clinical accuracy of AI-generated handoff summaries, and what validation should be required before clinicians rely on them?",
      failurePrompt: "What minimum professional practice standards should health organisations establish before deploying AI in clinical handoff workflows?"
    },

    {
      id: "trust",
      number: "05",
      name: "Trust",
      definition: "Ensure the interaction communicates credibility, transparency and reliability so people feel confident relying on the guidance provided.",

      overview: {
        moments: [
          {
            context: "First-time user — unfamiliar with AI triage",
            text: "Before any clinical assessment begins, the system explains: \"This service follows the same clinical guidelines used by nurses on the 13HEALTH line. Everything you tell me is confidential and goes directly to a clinician if you need one.\" Credibility is established before it is needed."
          },
          {
            context: "Older caller — low digital confidence",
            text: "A caller in their seventies who is uncertain about speaking to an AI is not asked to simply trust and proceed. The system acknowledges the question directly: \"You're speaking with an automated triage service. A real nurse is available if you'd prefer — just say so at any point.\""
          },
          {
            context: "Complex situation — patient questions the recommendation",
            text: "A caller who questions the recommendation — \"Why are you telling me to go to hospital? I thought this wasn't serious\" — receives a plain-language explanation: \"Based on the symptoms you've described, particularly the combination of fever and difficulty breathing, our protocols recommend same-day assessment. This isn't precautionary — it's the threshold we apply.\""
          }
        ],
        impact: "Trust increases adherence to guidance and reduces unnecessary service utilisation caused by doubt or uncertainty.",
        ifFails: "A system that cannot demonstrate its basis for advice will be second-guessed or ignored. Worse, misplaced trust in an uncredentialled system creates liability exposure and potential for systemic harm at scale."
      },

      failures: [
        {
          name: "Anthropomorphism and professional boundary erosion",
          context: "AI systems designed to mimic human interaction",
          breakdown: "AI systems designed to simulate human empathy or relationship mislead patients about the nature of the interaction — and erode the professional boundaries that protect both patient and clinician.",
          consequence: "Patients disclose information or make decisions based on a perceived relationship that does not exist. Professional accountability becomes unclear.",
          source: "ACN Position Statement, pp. 4, 7"
        },
        {
          name: "Emotional distress as a trust barrier",
          context: "High-anxiety telephone triage callers",
          breakdown: "Heightened fear or anxiety in a caller acts as a functional barrier to accurate disclosure. When the system cannot detect or respond to emotional state, it proceeds as if the information received is complete and reliable — when it may not be.",
          consequence: "Assessment accuracy is undermined at exactly the moment clinical stakes are highest. Guidance is generated from incomplete information without any signal that this has occurred.",
          source: "Huddleston Dissertation, pp. 1, 10"
        }
      ],

      vendor: [
        {
          tag: "capability",
          label: "Capability",
          question: "How does the system communicate to patients the basis for its guidance — which clinical protocols it follows and what their currency is?",
          intent: "Tests whether transparency is designed in or absent."
        },
        {
          tag: "evidence",
          label: "Evidence",
          question: "What clinical protocols underpin your triage logic, who authored them, when were they last reviewed, and by whom?",
          intent: "Establishes the evidential and governance basis for clinical content."
        },
        {
          tag: "governance",
          label: "Governance",
          question: "What is your process for updating clinical content when guidelines change, and what is the maximum permissible lag between guideline update and system update?",
          intent: "Tests currency governance."
        },
        {
          tag: "accountability",
          label: "Accountability",
          question: "How does your system handle a patient asking why it gave a particular recommendation — can it explain its reasoning in plain language?",
          intent: "Tests explainability as a trust and accountability mechanism."
        }
      ],

      explorePrompt: "What explainability requirements should health organisations build into AI procurement to meet patient trust and clinical governance obligations?",
      failurePrompt: "How should health organisations require vendors to handle emotional distress signals in patient-facing AI, and what escalation protocols should be mandatory?"
    },

    {
      id: "effort",
      number: "06",
      name: "Effort",
      definition: "Ensure the interaction requires minimal cognitive and administrative work to reach a safe outcome.",

      overview: {
        moments: [
          {
            context: "Standard triage — single description",
            text: "A caller describes their symptoms once, in their own words and in their own order. The system captures, structures, and reuses that information for the rest of the interaction. At no point is the caller asked to repeat, reframe, or re-confirm what they have already said."
          },
          {
            context: "Caller with limited English",
            text: "A caller whose first language is Cantonese is not asked to navigate the full interaction in English before accessing support. The system detects the language early, offers to continue in Cantonese, and does not require the caller to advocate for themselves before receiving appropriate assistance."
          },
          {
            context: "Caller with cognitive or communication difficulty",
            text: "An older caller who is slow to respond or describes symptoms non-linearly is not timed out, interrupted, or asked to restart. The system holds the thread, surfaces what it has understood so far, and asks only what it still needs. Effort is absorbed by the system, not the person."
          }
        ],
        impact: "Lower effort increases completion rates and ensures people reach safe outcomes more quickly.",
        ifFails: "High cognitive burden at the point of need is a barrier to care. Vulnerable populations — those in pain, experiencing anxiety, or with low health literacy — are disproportionately affected. Effort is an equity issue as much as a design issue."
      },

      failures: [
        {
          name: "Insufficient training data forcing manual validation",
          context: "AI deployment with inadequate datasets",
          breakdown: "When algorithms are deployed without sufficient or representative data, clinicians are drawn into a cycle of manually checking and questioning outputs — eliminating the efficiency the system was designed to create.",
          consequence: "Clinical workload increases rather than decreases. The burden shifts from the system to the person, compounding pressure in already stretched environments.",
          source: "ACN Position Statement, pp. 1, 3"
        },
        {
          name: "Communication fatigue and cognitive exhaustion",
          context: "Extended remote triage shifts",
          breakdown: "Remote assessment demands intensified cognitive effort to process verbal narratives without visual confirmation. Over a shift, this produces a form of professional exhaustion that diminishes capacity for complex pattern recognition and empathetic listening.",
          consequence: "Degraded clinical performance in the later stages of every shift — precisely when volume often peaks and errors are hardest to detect.",
          source: "Huddleston Dissertation, p. 9"
        }
      ],

      vendor: [
        {
          tag: "capability",
          label: "Capability",
          question: "How does the system minimise the number of questions required to reach a triage outcome — what is the average interaction length and how is that measured?",
          intent: "Tests whether efficiency is measured and designed for."
        },
        {
          tag: "capability",
          label: "Capability",
          question: "How does the system handle callers who struggle to articulate symptoms clearly — including those with communication difficulties, high distress, or limited English?",
          intent: "Tests accessibility and effort distribution across populations."
        },
        {
          tag: "evidence",
          label: "Evidence",
          question: "What is your completion rate data across different demographic groups, and where do callers most commonly drop out of the interaction?",
          intent: "Uses dropout data as a proxy for effort failure points."
        },
        {
          tag: "governance",
          label: "Governance",
          question: "How is interaction effort monitored over time — and what process exists to reduce friction when abandonment rates increase?",
          intent: "Tests whether effort is actively governed or only measured."
        }
      ],

      explorePrompt: "How should health organisations use interaction completion and dropout data to hold vendors accountable for the Effort principle?",
      failurePrompt: "What workload impact assessments should health organisations require before deploying patient-facing AI in clinical environments?"
    },

    {
      id: "clinician-confidence",
      number: "07",
      name: "Clinician confidence",
      definition: "Ensure clinicians receive structured, relevant information that supports faster and safer clinical judgement.",

      overview: {
        moments: [
          {
            context: "Pre-consultation briefing — nurse triage",
            text: "Before the clinician speaks to the patient, a structured summary appears: presenting complaint, symptom duration, severity indicators, red flags triggered, and relevant history captured during the AI interaction. The clinician begins with clinical context already established."
          },
          {
            context: "ED handoff — high-acuity presentation",
            text: "A patient arriving at the ED following an AI triage interaction is accompanied by a structured clinical note the receiving nurse can access before initial assessment. Time to first clinical decision is reduced because information-gathering has already begun."
          },
          {
            context: "After-hours GP — telehealth consult",
            text: "A GP receiving a telehealth call routed through the AI system has a pre-populated summary including the patient's described symptoms, the questions the system asked, and responses given. The GP uses this to direct the consultation rather than starting the assessment from scratch."
          }
        ],
        impact: "Structured information reduces cognitive load and improves clinical decision making.",
        ifFails: "If AI-generated summaries are incomplete or not trusted by clinicians, they will be disregarded — adding overhead without value. Over-reliance on a flawed summary introduces new vectors for clinical error."
      },

      failures: [
        {
          name: "AI education gap creating liability anxiety",
          context: "Clinical workforce without structured AI training",
          breakdown: "Without education on how AI systems work, clinicians use them hesitantly and carry unresolved anxiety about their legal accountability when acting on automated recommendations.",
          consequence: "Inconsistent system use, reluctance to act on AI outputs, and unresolved liability exposure for individual clinicians — none of which is visible to the organisation.",
          source: "ACN Position Statement, pp. 5, 8"
        },
        {
          name: "Lack of local validation rendering outputs indefensible",
          context: "AI systems not tested in the Australian clinical environment",
          breakdown: "Clinical AI outputs generated by systems not validated against local populations, guidelines, and care contexts lack the evidentiary basis required for professional and legal defensibility.",
          consequence: "Clinicians who act on these outputs carry personal professional risk. Organisations using unvalidated systems carry institutional and regulatory risk.",
          source: "ACN Position Statement, p. 8"
        },
        {
          name: "Decision-making paralysis from assessment uncertainty",
          context: "High-stakes remote triage without visual confirmation",
          breakdown: "When triage is conducted without visual cues, clinicians face elevated ambiguity that increases psychological burden — leading either to paralysis or systematic over-triage to manage uncertainty.",
          consequence: "Either delayed decisions under-serving urgent patients, or unnecessary escalation consuming emergency capacity. Both are costly; neither is safe.",
          source: "Huddleston Dissertation, pp. 2, 5"
        }
      ],

      vendor: [
        {
          tag: "capability",
          label: "Capability",
          question: "What is the structure and content of the clinical summary produced — which fields are always present, which are conditional, and how is clinical urgency flagged?",
          intent: "Tests whether the summary is designed for clinical use or general readout."
        },
        {
          tag: "evidence",
          label: "Evidence",
          question: "What clinician feedback have you collected on summary accuracy, completeness, and usability — and what has changed in the product as a result?",
          intent: "Tests whether clinician experience drives product iteration."
        },
        {
          tag: "governance",
          label: "Governance",
          question: "How are errors or omissions in clinical summaries reported, investigated, and fed back into system improvement?",
          intent: "Tests the feedback loop between clinical use and system quality."
        },
        {
          tag: "accountability",
          label: "Accountability",
          question: "If a clinician acts on an inaccurate AI-generated summary and patient harm results, what is your liability position and how is causation assessed?",
          intent: "The most critical accountability question for clinical governance leads."
        }
      ],

      explorePrompt: "What clinical governance structures should health organisations put in place before allowing clinicians to rely on AI-generated patient summaries?",
      failurePrompt: "What local validation requirements should health organisations insist on before deploying clinical AI — and who should be responsible for ongoing revalidation?"
    }

  ],

  accountability: {

    intro: "Every APEX condition has an owner. When accountability is not explicitly assigned, these conditions default to everyone — which means they belong to no one. This map shows where responsibility sits, what each role must ask, and what happens to the condition when that role is absent or uninformed.",

    roles: [
      {
        id: "board",
        title: "Board and executive",
        abbr: "Board",
        description: "Sets risk appetite and governance requirements. Accountable for ensuring clinical AI is treated as a patient safety issue, not an IT procurement decision.",
        conditions: ["trust", "clarity", "relevance"],
        owns: "Strategic risk and ultimate institutional liability",
        mustAsk: "Has our organisation formally defined what constitutes an acceptable patient experience outcome for AI-assisted triage — and how do we govern against it?",
        ifAbsent: "AI deployment proceeds without board-level safety framing. Risk is discovered reactively, after a failure, rather than designed out proactively."
      },
      {
        id: "cmio",
        title: "Chief Medical / Nursing Information Officer",
        abbr: "CMIO / CNIO",
        description: "Owns the clinical integrity of AI outputs. Accountable for validating that clinical protocols are embedded correctly and that clinician-facing summaries are accurate and usable.",
        conditions: ["clinician-confidence", "continuity", "clarity"],
        owns: "Clinical protocol governance and AI output accuracy",
        mustAsk: "What evidence do we have that clinicians are using — not bypassing — AI-generated summaries, and what is our process when they report inaccuracies?",
        ifAbsent: "Clinical content is governed by the vendor, not the organisation. Errors in triage logic or handoff summaries have no internal escalation path."
      },
      {
        id: "cio",
        title: "Chief Information Officer",
        abbr: "CIO",
        description: "Owns infrastructure performance and system integration. Accountable for response latency, uptime, data continuity across channels, and the technical conditions that determine whether the patient experience holds under load.",
        conditions: ["timeliness", "continuity", "effort"],
        owns: "Infrastructure performance and system reliability",
        mustAsk: "What is our real-time monitoring capability for latency degradation during peak demand, and who is alerted when clinical safety thresholds are breached?",
        ifAbsent: "Timeliness and continuity failures are treated as IT incidents, not clinical safety events. There is no shared accountability between infrastructure and clinical governance."
      },
      {
        id: "procurement",
        title: "Procurement and legal",
        abbr: "Procurement",
        description: "Owns the contractual framework within which vendor accountability is defined. Accountable for ensuring APEX conditions are written into contracts as performance obligations — not aspirational features.",
        conditions: ["trust", "relevance", "effort"],
        owns: "Contractual risk allocation and vendor performance obligations",
        mustAsk: "For each APEX condition, have we written a measurable performance standard into the contract — and have we defined the remedy if the vendor fails to meet it?",
        ifAbsent: "Vendor accountability exists only in sales materials. When conditions fail, there is no contractual basis for remedy and the organisation absorbs the risk."
      },
      {
        id: "clinical-governance",
        title: "Clinical governance",
        abbr: "Clin. gov.",
        description: "Owns the ongoing safety monitoring of the AI system in operation. Accountable for incident reporting pathways, audit of interaction quality, and the feedback loop between clinical outcomes and system performance.",
        conditions: ["clarity", "trust", "clinician-confidence", "relevance"],
        owns: "Operational safety monitoring and incident response",
        mustAsk: "Do we have a defined incident category for AI triage failures, and is our current incident reporting system capable of capturing and attributing them?",
        ifAbsent: "Failures are invisible. There is no mechanism to detect systematic errors, attribute adverse outcomes to AI performance, or trigger corrective action."
      },
      {
        id: "workforce",
        title: "Workforce and education",
        abbr: "Workforce",
        description: "Owns clinician capability to work safely with AI systems. Accountable for ensuring clinical staff understand how AI outputs are generated, what their limitations are, and how to exercise professional judgement in an AI-assisted workflow.",
        conditions: ["clinician-confidence", "effort", "continuity"],
        owns: "Clinical workforce AI capability and education standards",
        mustAsk: "Do our clinicians have the structured education they need to safely use, interrogate, and — when necessary — override AI-generated clinical information?",
        ifAbsent: "Clinicians carry unresolved liability anxiety, use the system inconsistently, and have no shared professional standard for AI-assisted decision making."
      }
    ]
  },

  journey: [

    {
      id: "recognition",
      number: "01",
      name: "Recognition",
      voice: "\"Something doesn't feel right. Should I be worried?\"",
      tension: { level: "mid", width: 55, label: "Uncertainty and hesitation" },
      what: "The patient notices symptoms and begins to assess whether they warrant action. This is a moment of self-triage — shaped by health literacy, prior experience, and anxiety. The decision to seek help at all is made here.",
      conditions: [
        { name: "Clarity", status: "active", note: "Clear framing of when to act reduces dangerous delay" },
        { name: "Trust", status: "critical", note: "If the system is not known or credible, patients won't engage at all" },
        { name: "Effort", status: "active", note: "Low barrier to first contact increases likelihood of engagement" }
      ],
      risks: [
        "Patient normalises serious symptoms due to health literacy gaps",
        "No trusted, accessible entry point — patient delays or self-manages unsafely",
        "Cognitive load of uncertainty prevents action entirely"
      ],
      explorePrompt: "What design interventions at the Recognition stage most effectively reduce dangerous delay in seeking care?"
    },

    {
      id: "first-contact",
      number: "02",
      name: "First contact",
      voice: "\"I'm going to call. I hope I get through quickly.\"",
      tension: { level: "high", width: 80, label: "High anxiety, high stakes" },
      what: "The patient initiates contact with the health system — via phone, app, or web. This is the AI's first moment of direct interaction. The system must immediately signal competence, safety, and engagement. Abandonment risk is highest here.",
      conditions: [
        { name: "Timeliness", status: "critical", note: "Latency at first contact reads as absence — triggers abandonment" },
        { name: "Clarity", status: "active", note: "First instructions set the tone for the entire interaction" },
        { name: "Trust", status: "critical", note: "Credibility must be established in the first exchange" },
        { name: "Effort", status: "active", note: "Minimal friction prevents drop-off before assessment begins" }
      ],
      risks: [
        "Response latency signals system failure — caller hangs up",
        "Unclear opening creates confusion about what the system can do",
        "Emotional distress blocks accurate symptom disclosure from the start",
        "Lack of perceived credibility undermines everything that follows"
      ],
      explorePrompt: "What are the most critical design requirements for the first 30 seconds of a patient-facing AI triage interaction?"
    },

    {
      id: "triage",
      number: "03",
      name: "Triage interaction",
      voice: "\"I hope it understands me. I'm not sure how to describe this.\"",
      tension: { level: "high", width: 90, label: "Peak cognitive and emotional load" },
      what: "The core assessment exchange. The system gathers symptom information, interprets it, and begins forming a triage recommendation. This is where the majority of APEX conditions are simultaneously active — and where the compounding effect of multiple failures is most dangerous.",
      conditions: [
        { name: "Clarity", status: "critical", note: "Questions must be understood under stress without visual cues" },
        { name: "Relevance", status: "critical", note: "Responses must reflect the patient's actual context" },
        { name: "Timeliness", status: "active", note: "Conversational pace must be maintained" },
        { name: "Effort", status: "critical", note: "Cognitive burden peaks — minimal repeat, minimal confusion" },
        { name: "Trust", status: "active", note: "System must continue to signal credibility throughout" }
      ],
      risks: [
        "LLM hallucination generates plausible but incorrect clinical signal",
        "Cultural or linguistic misalignment produces incorrect triage priority",
        "Emotional distress prevents accurate disclosure — system proceeds on incomplete information",
        "Visual cue deprivation increases severity misinterpretation risk",
        "High effort causes partial or full abandonment before recommendation"
      ],
      explorePrompt: "What governance controls should be in place to monitor triage interaction quality in real time across a patient-facing AI system?"
    },

    {
      id: "recommendation",
      number: "04",
      name: "Recommendation",
      voice: "\"What should I do? Will I understand what they tell me?\"",
      tension: { level: "mid", width: 65, label: "Decision pressure — must act on guidance" },
      what: "The system delivers its triage recommendation. The patient must receive, understand, and act on guidance — often while still anxious, sometimes in pain, and without anyone to clarify. This is the moment Clarity is most directly a safety variable.",
      conditions: [
        { name: "Clarity", status: "critical", note: "Guidance must be immediately actionable in plain language" },
        { name: "Relevance", status: "critical", note: "Recommended service must actually be available and accessible" },
        { name: "Trust", status: "active", note: "Patient must believe the recommendation is safe to follow" },
        { name: "Timeliness", status: "active", note: "Delay between assessment and recommendation erodes confidence" }
      ],
      risks: [
        "Recommendation directs patient to unavailable or inaccessible service",
        "Plain language failure — patient misinterprets urgency level",
        "Patient doubts recommendation and seeks conflicting advice, delaying care",
        "System recommends care pathway inconsistent with local clinical guidelines"
      ],
      explorePrompt: "How should health organisations validate that AI triage recommendations are being understood and acted on correctly across different patient populations?"
    },

    {
      id: "handoff",
      number: "05",
      name: "Handoff",
      voice: "\"Do I have to start over? Does anyone know why I called?\"",
      tension: { level: "high", width: 75, label: "Trust at risk — context must transfer" },
      what: "The patient transitions from the AI system to a human clinician. This is the most structurally fragile moment in the journey — where the value of everything gathered in triage is either preserved or lost. The patient's willingness to trust the clinician is shaped by whether the system appears to have worked.",
      conditions: [
        { name: "Continuity", status: "critical", note: "All context must transfer intact — repetition destroys trust" },
        { name: "Clinician confidence", status: "critical", note: "Clinician must receive structured, usable information" },
        { name: "Trust", status: "active", note: "Patient's confidence in the system is tested at handoff" },
        { name: "Effort", status: "active", note: "Requiring repetition adds burden at an already high-stress moment" }
      ],
      risks: [
        "Context loss forces patient to repeat full history under stress",
        "Clinician does not trust or use AI summary — re-takes history regardless",
        "AI-generated summary contains inaccuracies that shape clinical assessment",
        "Handoff delay creates dangerous gap between triage and clinical response",
        "No professional practice standard governs how clinician uses AI output"
      ],
      explorePrompt: "What accountability structure should govern the handoff between AI triage and a human clinician — and where does professional responsibility sit?"
    },

    {
      id: "resolution",
      number: "06",
      name: "Care and resolution",
      voice: "\"Was that the right decision? Did the system help or slow me down?\"",
      tension: { level: "low", width: 30, label: "Reflecting on the experience" },
      what: "The patient receives care and reflects on the experience. This stage determines whether trust in the system is reinforced or eroded — shaping future help-seeking behaviour. Outcome data from this stage is also the primary source of evidence for system improvement.",
      conditions: [
        { name: "Continuity", status: "active", note: "Clinical record should reflect the full AI-assisted pathway" },
        { name: "Trust", status: "active", note: "Positive resolution reinforces future engagement" },
        { name: "Clinician confidence", status: "active", note: "Clinician outcome data should feed back into AI system quality" }
      ],
      risks: [
        "No feedback mechanism captures whether triage recommendation led to correct care",
        "Poor experience reduces future help-seeking — particularly in underserved populations",
        "Absence of outcome data prevents system learning and quality improvement",
        "Adverse outcome with no clear attribution makes governance and accountability impossible"
      ],
      explorePrompt: "What outcome data should health organisations require AI triage vendors to capture, and how should it be used for ongoing system governance?"
    }

  ]

};

if (typeof module !== "undefined" && module.exports) {
  module.exports = APEX;
}
