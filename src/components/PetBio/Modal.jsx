import React, { useState } from 'react';
import { sendEmail } from '../../services/users';

const Modal = ({ isOpen, onClose, pet, user, setReload }) => {
  // State for each form field
  const [senderEmail, setSenderEmail] = useState(`${user?.useremail ? user.useremail : ''}`);
  const [recipientEmail, setRecipientEmail] = useState('primon201217@gmail.com');
  const [subject, setSubject] = useState(`Adoption Request ${pet?.name ? pet.name : ''}`);
  const [body, setBody] = useState(`Hello, I am interested in adopting ${pet?.name ? pet.name : ''}!`);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Here you would typically send the data to a server
    // For demonstration, we'll just log it to the console

    const data = {
        senderEmail: user?.useremail,
        petId: pet.id,
        status: 1,
    }

    const emailButton = () => {
      const recipient = "primon201217@gmail.com";
      const subject = `Adoption Request - ${pet.name}`;
      const body = `Hello, I am interested in adopting ${pet.name}!`;
      const mailtoLink = `mailto:${encodeURIComponent(recipient)}
                        ?subject=${encodeURIComponent(subject)}
                        &body=${encodeURIComponent(body)}`;
      window.open(mailtoLink, "_blank");
    };

    await sendEmail(data).then(()=>{setReload(true)})

    emailButton();

    // Optionally, close the modal after submission
    onClose();
  };

 

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 w-full h-full overflow-y-auto bg-gray-600 bg-opacity-50" id="my-modal">
      <div className="relative p-5 mx-auto bg-white border rounded-md shadow-lg top-20 w-96">
        <div className="mt-3 text-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Send Email for {pet.name}</h3>
          <form className="py-3 mt-2 px-7" onSubmit={handleSubmit}>
            {/* <div className="mb-4">
              <label htmlFor="senderEmail" className="block text-sm font-medium text-gray-700">Sender Email</label>
              <input type="email" id="senderEmail" name="senderEmail" required
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div> */}
            {/* <div className="mb-4">
              <label htmlFor="recipientEmail" className="block text-sm font-medium text-gray-700">Recipient Email</label>
              <input type="email" id="recipientEmail" name="recipientEmail" required
                defaultValue={recipientEmail}
                // onChange={(e) => setRecipientEmail(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div> */}
            <div className="mb-4">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
              <input type="text" id="subject" name="subject" required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="body" className="block text-sm font-medium text-gray-700">Body</label>
              <textarea id="body" name="body" rows="4" required
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <button
                type="submit"
                className="px-4 py-2 text-base font-medium text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Send
              </button>
              <button
                type="button"
                id="cancel-btn"
                className="px-4 py-2 text-base font-medium text-white bg-gray-500 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;