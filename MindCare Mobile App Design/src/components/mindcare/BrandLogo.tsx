import { cn } from '@/lib/utils';
import logoAsset from '@/assets/mindcare-logo.png';

const BrandLogo = ({ size = 'medium', className }: { size?: 'small' | 'medium' | 'large'; className?: string }) => {
  const sizes = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-[72px] h-[72px]'
  };

  return (
    <img 
      src={logoAsset} 
      alt="MindCare Logo" 
      className={cn(sizes[size], "object-contain", className)}
    />
  );
};

export default BrandLogo;
