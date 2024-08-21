import React from 'react';
import { FaTwitter, FaWhatsapp, FaTelegram } from 'react-icons/fa';

const ShareAchievement = () => {
  const shareText = encodeURIComponent(`I just completed all levels in the Audio Transcription task! Join now: [http://www.play2earn.ai/]`);

  const handleShare = (platform) => {
    let shareUrl;

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${shareText}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${shareText}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=[Website URL]&text=${shareText}`;
        break;
      default:
        shareUrl = null;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="share-achievement">
      <h3>Share your achievement:</h3>
      <div className="share-buttons">
        <button onClick={() => handleShare('twitter')}><FaTwitter /> Twitter</button>
        <button onClick={() => handleShare('whatsapp')}><FaWhatsapp /> WhatsApp</button>
        <button onClick={() => handleShare('telegram')}><FaTelegram /> Telegram</button>
      </div>
    </div>
  );
};

export default ShareAchievement;