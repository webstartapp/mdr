import PublicFooter from '@/components/shared/PublicFooter';
import PublicHeader from '@/components/shared/PublicHeader';

const PublicLayout = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  return (
    <div className='flex flex-col min-h-screen medical-aura'>
      <PublicHeader />
      <main className="grow">{children}</main>
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
