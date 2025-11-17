import React from 'react';
import { Modal } from '../common/Modal';

interface TrailerPlayerProps {
  videoKey: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const TrailerPlayer: React.FC<TrailerPlayerProps> = ({
  videoKey,
  isOpen,
  onClose,
  title,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" title={title}>
      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </Modal>
  );
};

