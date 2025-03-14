import React, { useState } from 'react';
import { Brain, ArrowLeft, ChevronRight, Clock, FileText, Shield, AlertTriangle, Lightbulb, Route, LineChart, Files } from 'lucide-react';
import { Link } from 'react-router-dom';

type AssessmentPhase = {
  id: number;
  title: string;
  icon: React.ReactNode;
  consultantTime: string;
  companyTime: string;
  description: string;
};

const assessmentPhases: AssessmentPhase[] = [
  {
    id: 1,
    title: "Executive Summary",
    icon: <FileText className="text-blue-400" size={24} />,
    consultantTime: "1-2 days",
    companyTime: "0.5-1 day",
    description: "A comprehensive overview of the assessment findings and recommendations."
  },
  {
    id: 2,
    title: "Current State Analysis",
    icon: <Brain className="text-purple-400" size={24} />,
    consultantTime: "1-2 weeks",
    companyTime: "3-5 days",
    description: "Evaluation of business processes, technology infrastructure, data quality, and skill sets."
  },
  {
    id: 3,
    title: "Regulatory Compliance Review",
    icon: <Shield className="text-green-400" size={24} />,
    consultantTime: "1 week",
    companyTime: "2-3 days",
    description: "Assessment of compliance with GDPR, EU AI Act, NIS2, and the Cyber Resilience Act."
  },
  {
    id: 4,
    title: "Risk Assessment",
    icon: <AlertTriangle className="text-yellow-400" size={24} />,
    consultantTime: "3-5 days",
    companyTime: "1-2 days",
    description: "Identification and evaluation of data privacy, operational, compliance, and supply chain risks."
  },
  {
    id: 5,
    title: "Opportunity Identification",
    icon: <Lightbulb className="text-amber-400" size={24} />,
    consultantTime: "1 week",
    companyTime: "2-3 days",
    description: "Pinpointing areas suitable for AI-driven automation and innovation."
  },
  {
    id: 6,
    title: "Implementation Roadmap",
    icon: <Route className="text-indigo-400" size={24} />,
    consultantTime: "1 week",
    companyTime: "2-3 days",
    description: "Development of a detailed implementation plan with prioritized initiatives."
  },
  {
    id: 7,
    title: "Monitoring and Evaluation",
    icon: <LineChart className="text-rose-400" size={24} />,
    consultantTime: "2-3 days",
    companyTime: "1-2 days",
    description: "Establishment of KPIs, feedback mechanisms, and compliance audit schedules."
  },
  {
    id: 8,
    title: "Appendices",
    icon: <Files className="text-cyan-400" size={24} />,
    consultantTime: "1-2 days",
    companyTime: "0.5-1 day",
    description: "Compilation of supporting documents, glossaries, and references."
  }
];

type Question = {
  id: number;
  text: string;
  options: string[];
};

const questions: Question[] = [
  {
    id: 1,
    text: "What is your primary goal for implementing AI in your business?",
    options: [
      "Automate repetitive tasks",
      "Improve customer service",
      "Enhance decision making",
      "Increase operational efficiency"
    ]
  },
  {
    id: 2,
    text: "Which area of your business needs the most immediate attention?",
    options: [
      "Customer Support",
      "Data Analysis",
      "Process Automation",
      "Resource Management"
    ]
  },
  {
    id: 3,
    text: "What is your current level of AI implementation?",
    options: [
      "No AI implementation yet",
      "Basic automation tools",
      "Some AI solutions in place",
      "Advanced AI integration"
    ]
  }
];

export default function AIToolsAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [showAssessment, setShowAssessment] = useState(true);

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: answer }));
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const startAssessment = () => {
    setShowAssessment(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-blue-300 hover:text-blue-200 mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>

        {showAssessment ? (
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-purple-500/20">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400">
                  AI Tools Assessment Process
                </h1>
                <Brain className="text-purple-400" size={32} />
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-blue-200 text-lg mb-6">
                  Embarking on an AI automation assessment involves a collaborative effort between your company and the consultant. The duration of this assessment can vary based on the organization's complexity, data availability, and specific objectives.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white/5 rounded-xl p-6 border border-purple-500/20">
                    <h3 className="text-xl font-semibold text-blue-300 mb-4">ThousandAIs Goals and Focus</h3>
                    <ul className="space-y-3 text-blue-200">
                      <li className="flex items-start">
                        <Brain className="text-purple-400 mr-2 mt-1" size={20} />
                        <span>Empowering your company to harness AI-driven automation, enhancing operational efficiency and profitability.</span>
                      </li>
                      <li className="flex items-start">
                        <Lightbulb className="text-amber-400 mr-2 mt-1" size={20} />
                        <span>Unlocking continuous AI opportunities, securing a competitive advantage in the market.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6 border border-purple-500/20">
                    <h3 className="text-xl font-semibold text-blue-300 mb-4">Total Estimated Time</h3>
                    <div className="space-y-3 text-blue-200">
                      <div className="flex items-center">
                        <Clock className="text-purple-400 mr-2" size={20} />
                        <span>Consultant: Approximately 5-7 weeks</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="text-blue-400 mr-2" size={20} />
                        <span>Company: Approximately 2-3 weeks cumulative effort</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assessmentPhases.map((phase) => (
                  <div
                    key={phase.id}
                    className="bg-white/5 rounded-xl p-6 border border-purple-500/20 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center mb-4">
                      {phase.icon}
                      <h3 className="text-lg font-semibold text-blue-300 ml-2">{phase.title}</h3>
                    </div>
                    <p className="text-blue-200 mb-4 text-sm">{phase.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-purple-300">
                        <Clock size={16} className="mr-2" />
                        <span>Consultant: {phase.consultantTime}</span>
                      </div>
                      <div className="flex items-center text-blue-300">
                        <Clock size={16} className="mr-2" />
                        <span>Company: {phase.companyTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={startAssessment}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg"
                >
                  Begin Assessment
                </button>
              </div>
            </div>
          </div>
        ) : !showResults ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-purple-500/20">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400">
                AI Tools Assessment
              </h1>
              <Brain className="text-purple-400" size={32} />
            </div>

            <div className="mb-8">
              <div className="flex justify-between text-blue-200 text-sm mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-purple-900/30 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <h2 className="text-xl text-blue-100 mb-6">
              {questions[currentQuestion].text}
            </h2>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-purple-500/20 text-blue-200 transition-all duration-300 flex items-center justify-between group"
                >
                  <span>{option}</span>
                  <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-purple-500/20 text-center">
            <Brain className="mx-auto text-purple-400 mb-6" size={48} />
            <h2 className="text-2xl font-bold text-blue-200 mb-4">
              Analysis Complete!
            </h2>
            <p className="text-blue-300 mb-8">
              Our AI experts are analyzing your responses to create a personalized recommendation report.
              We'll contact you shortly with detailed insights about the most suitable AI tools for your business.
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
            >
              Return to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}