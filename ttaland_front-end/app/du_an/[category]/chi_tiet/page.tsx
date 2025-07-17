'use client'
import Du_an_project_detail from '@/components/detail_page/du_an_project_detail';
import _navbar from '@/components/nav_bar/navbar';
import Footer from "@/components/layout/footer";

import { useParams, usePathname } from 'next/navigation';

const Du_an_project_detail_page = () => {
  const params = useParams();
  const pathname = usePathname();
  const { category, id } = params;

  const backPath = pathname.split('/').slice(0, -2).join('/');

  return (
    <div className="min-h-screen bg-gray-800">
      <div className="sticky top-0 z-50">
      <_navbar/>
      </div>
      <div className="py-8">
        <Du_an_project_detail 
          projectId={id as string} 
          category={category as string} 
          backPath={backPath}
        />
      </div>
      <Footer/>
    </div>
  );
};

export default Du_an_project_detail_page;