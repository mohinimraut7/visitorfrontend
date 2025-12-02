import React, { useState, useEffect } from 'react';
import { Search, Calendar, CheckCircle, User } from 'lucide-react';

const texts = {
  mr: {
    title: "अभिप्राय फॉर्म",
    mobileLabel: "मोबाईल नंबर टाका (10 अंक)",
    searching: "शोधत आहोत...",
    found: "सापडले!",
    notFound: "या नंबरवरून आजची एंट्री सापडली नाही",
    feedbackLabel: "अभिप्राय द्या *",
    nextDateLabel: "पुढील भेटीची तारीख *",
    submit: "अभिप्राय सादर करा",
    thankYou: "धन्यवाद! तुमचा अभिप्राय यशस्वी झाला",
  },
  en: {
    title: "Feedback Form",
    mobileLabel: "Enter Mobile Number (10 digits)",
    searching: "Searching...",
    found: "Found!",
    notFound: "No entry found for today",
    feedbackLabel: "Give Your Feedback *",
    nextDateLabel: "Next Appointment Date *",
    submit: "Submit Feedback",
    thankYou: "Thank you! Feedback submitted successfully",
  }
};

const meetingPersonMarathi: Record<string, string> = {
  "Superintendent of Police": "पोलीस अधीक्षक",
  "Additional Superintendent of Police": "अपर पोलीस अधीक्षक",
  "Sub-Divisional Officer, Ganeshpuri": "उप विभागीय अधिकारी गणेशपुरी",
  "Sub-Divisional Officer, Shahapur": "उप विभागीय अधिकारी शहापूर",
  "Sub-Divisional Officer, Murbad": "उप विभागीय अधिकारी मुरबाड",
  "Sub-Divisional Officer, Home Department": "उप विभागीय अधिकारी गृह",
  "In-Charge Officer": "प्रभारी अधिकारी",
  "पोलीस निरीक्षक": "पोलीस निरीक्षक"
};

const feedbackOptions = [
  { value: "Satisfied", mr: "समाधानी", en: "Satisfied" },
  { value: "Not Satisfied", mr: "असमाधानी", en: "Not Satisfied" },
  { value: "Next Appointment", mr: "पुढील भेटीची तारीख", en: "Next Appointment" },
  { value: "Officer Not Available", mr: "अधिकारी उपलब्ध नव्हते", en: "Officer Not Available" },
  { value: "Officer Busy In Meeting", mr: "अधिकारी व्यस्त होते", en: "Officer Busy In Meeting" },
];

interface Visit {
  applicationId?: string;
  visitNumber: number;
  contactPerson?: string;
  reasonToVisit?: string;
  entryAt: string;
  visitorPhoto?: string;
  feedbackGiven?: boolean;
  feedback?: string;
  feedbackSubmittedAt?: string;
}

interface Visitor {
  fullName: string;
  mobileNumber: string;
  policeStation?: string;
  visits: Visit[];
}

const FeedbackForm = () => {
  const [lang, setLang] = useState('mr');
  const [mobile, setMobile] = useState('');
  const [visitor, setVisitor] = useState<Visitor | null>(null);
  const [latestVisit, setLatestVisit] = useState<Visit | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [nextAppointment, setNextAppointment] = useState('');

  const t = texts[lang];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (mobile.length === 10) {
        fetchVisitor();
      } else {
        setVisitor(null);
        setLatestVisit(null);
        setError('');
        setFeedback('');
        setNextAppointment('');
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [mobile]);

  const fetchVisitor = async () => {
    setLoading(true);
    setError('');
    try {
      const mockVisitor: Visitor = {
        fullName: "राजेश कुमार",
        mobileNumber: mobile,
        policeStation: "ठाणे ग्रामीण",
        visits: [{
          applicationId: "APP001",
          visitNumber: 1,
          contactPerson: "Superintendent of Police",
          reasonToVisit: "तक्रार निवारण",
          entryAt: new Date().toISOString(),
          feedbackGiven: false
        }]
      };

      setVisitor(mockVisitor);
      setLatestVisit(mockVisitor.visits[mockVisitor.visits.length - 1]);
    } catch (err) {
      setError(t.notFound);
      setVisitor(null);
      setLatestVisit(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitor || !latestVisit || !feedback) return;

    if (feedback === "Next Appointment" && !nextAppointment) {
      alert(lang === 'mr' ? "कृपया तारीख निवडा" : "Please select a date");
      return;
    }

    setSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSuccess(true);
      setFeedback('');
      setNextAppointment('');
      setTimeout(() => {
        setSuccess(false);
        setMobile('');
        setVisitor(null);
        setLatestVisit(null);
      }, 4000);
    } catch (err) {
      alert(lang === 'mr' ? "अभिप्राय सबमिट करताना त्रुटी" : "Error submitting feedback");
    } finally {
      setSubmitting(false);
    }
  };

  const marathiMeetingPerson = latestVisit?.contactPerson
    ? (meetingPersonMarathi[latestVisit.contactPerson] || latestVisit.contactPerson)
    : '-';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-blue-700 text-white py-8 relative shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">{t.title}</h1>

          <div className="absolute top-4 right-4 bg-white rounded-full shadow-lg overflow-hidden">
            <button
              onClick={() => setLang('mr')}
              className={`px-6 py-2 font-semibold transition-colors ${
                lang === 'mr' ? 'bg-blue-700 text-white' : 'text-blue-700 hover:bg-blue-50'
              }`}
            >
              मराठी
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-6 py-2 font-semibold transition-colors ${
                lang === 'en' ? 'bg-blue-700 text-white' : 'text-blue-700 hover:bg-blue-50'
              }`}
            >
              English
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">

          <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-blue-700">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">
              {lang === 'mr' ? 'अभिप्राय भरा' : 'Submit Feedback'}
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.mobileLabel}
              </label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="9876543210"
                maxLength={10}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-700 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>

            {loading && (
              <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                <div className="animate-spin h-5 w-5 border-2 border-blue-700 border-t-transparent rounded-full"></div>
                <span>{t.searching}</span>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {visitor && latestVisit && (
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.feedbackLabel}
                  </label>
                  <select
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-700 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  >
                    <option value="">
                      {lang === 'mr' ? 'निवडा' : 'Select'}
                    </option>
                    {feedbackOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {lang === 'mr' ? opt.mr : opt.en}
                      </option>
                    ))}
                  </select>
                </div>

                {feedback === "Next Appointment" && (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t.nextDateLabel}
                    </label>
                    <input
                      type="date"
                      value={nextAppointment}
                      onChange={(e) => setNextAppointment(e.target.value)}
                      min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-700 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!visitor || !latestVisit || !feedback || submitting || (feedback === "Next Appointment" && !nextAppointment)}
                  className="w-full bg-blue-700 text-white py-4 rounded-lg font-bold text-xl hover:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                >
                  {submitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full"></div>
                    </div>
                  ) : t.submit}
                </button>
              </form>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mt-6 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>{t.thankYou}</span>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-2xl p-8 border-4 border-blue-700">
            <div className="text-center">
              {visitor && latestVisit ? (
                <>
                  {latestVisit.visitorPhoto ? (
                    <img
                      src={latestVisit.visitorPhoto}
                      alt="Visitor"
                      className="w-48 h-48 object-cover rounded-full mx-auto mb-6 border-4 border-blue-700 shadow-lg"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-blue-700 text-white rounded-full mx-auto mb-6 flex items-center justify-center text-6xl font-bold shadow-lg">
                      {visitor.fullName.charAt(0)}
                    </div>
                  )}

                  <h3 className="text-3xl font-bold text-blue-700 mb-6">
                    {visitor.fullName}
                  </h3>

                  <div className="space-y-3 text-left bg-white p-6 rounded-xl shadow-md">
                    <div className="border-b pb-2">
                      <strong className="text-gray-700">अर्ज क्रमांक:</strong>
                      <span className="ml-2 text-gray-900">{latestVisit.applicationId || 'N/A'}</span>
                    </div>
                    <div className="border-b pb-2">
                      <strong className="text-gray-700">भेट क्रमांक:</strong>
                      <span className="ml-2 text-gray-900">{latestVisit.visitNumber}</span>
                    </div>
                    <div className="border-b pb-2">
                      <strong className="text-gray-700">मोबाईल:</strong>
                      <span className="ml-2 text-gray-900">{visitor.mobileNumber}</span>
                    </div>
                    <div className="border-b pb-2">
                      <strong className="text-gray-700">पोलीस स्टेशन:</strong>
                      <span className="ml-2 text-gray-900">{visitor.policeStation || '-'}</span>
                    </div>
                    <div className="border-b pb-2">
                      <strong className="text-gray-700">कोणास भेटायचे:</strong>
                      <span className="ml-2 text-gray-900">{marathiMeetingPerson}</span>
                    </div>
                    <div className="border-b pb-2">
                      <strong className="text-gray-700">भेटीचे कारण:</strong>
                      <span className="ml-2 text-gray-900">{latestVisit.reasonToVisit || '-'}</span>
                    </div>
                    <div>
                      <strong className="text-gray-700">वेळ:</strong>
                      <span className="ml-2 text-gray-900">
                        {new Date(latestVisit.entryAt).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {latestVisit.feedbackGiven && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mt-6">
                      <div><strong>अभिप्राय दिला:</strong> {latestVisit.feedback || '-'}</div>
                      <div className="mt-1">
                        <strong>वेळ:</strong> {latestVisit.feedbackSubmittedAt
                          ? new Date(latestVisit.feedbackSubmittedAt).toLocaleString('en-IN')
                          : '-'}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="w-32 h-32 bg-blue-700 text-white rounded-full mx-auto mb-6 flex items-center justify-center text-6xl font-bold shadow-lg">
                    <User className="w-16 h-16" />
                  </div>
                  <h3 className="text-3xl font-bold text-blue-700 mb-4">
                    ठाणे ग्रामीण पोलीस
                  </h3>
                  <h4 className="text-2xl font-semibold text-blue-600 mb-8">
                    नागरिक अभिप्राय प्रणाली
                  </h4>
                  <p className="text-gray-600 text-lg mt-12">
                    {lang === 'mr'
                      ? 'वर मोबाईल नंबर टाका → माहिती दिसेल'
                      : 'Enter mobile number → Details will appear'}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
