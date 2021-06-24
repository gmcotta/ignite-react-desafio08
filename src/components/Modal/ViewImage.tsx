import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="900px" maxH="600px">
        <ModalBody padding={0}>
          <Image src={imgUrl} w="100%" h="100%" objectFit="contain" />
        </ModalBody>
      </ModalContent>
      <ModalFooter bg="pGray.800" justifyContent="flex-start">
        <Link href={imgUrl} isExternal>
          Abrir original
        </Link>
      </ModalFooter>
    </Modal>
  );
}
