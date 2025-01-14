import React, { useState } from 'react';
import { AppProvider, Button, Badge, InlineStack } from '@shopify/polaris';

const EmojiReactionBar = () => {
  const [reactions, setReactions] = useState({
    check: 0,
    heart: 0,
    smile: 0,
    fire: 0,
    cool: 0,
    party: 0,
  });

  const handleReaction = (type) => {
    setReactions((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  return (
    <AppProvider i18n={{}}>
      <style>{`
            .emojiPreview{
                width: 30px;
                height: 30px;
                background: #EFEEEE;
                border-radius: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                border: none;
                font-size: 16px;
                cursor:pointer;
            }
        `}</style>
      <InlineStack gap="200">
        <button className="emojiPreview" onClick={() => handleReaction('check')}>
          ✅{/* ✅ <Badge>{reactions.check.toString()}</Badge> */}
        </button>
        <button className="emojiPreview" onClick={() => handleReaction('heart')}>
          ❤️{/* ❤️ <Badge>{reactions.heart.toString()}</Badge> */}
        </button>
        <button className="emojiPreview" onClick={() => handleReaction('smile')}>
          😊{/* 😊 <Badge>{reactions.smile.toString()}</Badge> */}
        </button>
        <button className="emojiPreview" onClick={() => handleReaction('fire')}>
          🔥{/* 🔥 <Badge>{reactions.fire.toString()}</Badge> */}
        </button>
        <button className="emojiPreview" onClick={() => handleReaction('cool')}>
          😎{/* 😎 <Badge>{reactions.cool.toString()}</Badge> */}
        </button>
        <button className="emojiPreview" onClick={() => handleReaction('party')}>
          🎉{/* 🎉 <Badge>{reactions.party.toString()}</Badge> */}
        </button>
      </InlineStack>
    </AppProvider>
  );
};

export default EmojiReactionBar;
