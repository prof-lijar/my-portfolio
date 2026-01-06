import KaistShowcase from '@/components/hello-kaist/kaist-showcase';
import ExtracurricularActivities from '@/components/hello-kaist/extracurricular-activities';
import ResearchPapers from '@/components/hello-kaist/research-papers';

export default function HelloKaistPage() {
  return (
    <>
      <ExtracurricularActivities />
      <KaistShowcase />
      <ResearchPapers />
    </>
  );
}
