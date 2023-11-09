import { Modal } from '@/sharedComponents/ui/Modal';
import { Suspense } from 'react';
import { LoginFormAsync } from '../LoginForm.async';
import { Loader } from '@/sharedComponents/ui/Loader';

interface LoginModalProps {
    classNameContent?: string;
    classNameOverlay?: string;
    isOpen: boolean;
    onClose?: () => void;
    onSuccess: () => void;
}

export const LoginModal = ({ classNameContent, classNameOverlay, isOpen, onClose, onSuccess }: LoginModalProps) => (
    <Modal
        classNameContent={classNameContent}
        isOpen={isOpen}
        onClose={onClose}
        classNameOverlay={classNameOverlay}
        lazy
    >
        <Suspense fallback={<Loader />}>
            <LoginFormAsync onSuccess={onSuccess} />
        </Suspense>
    </Modal>
);
