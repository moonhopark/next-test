import { getCourses } from '@/pages/api/courses';

import type { GetStaticPaths, GetStaticProps } from 'next';

const CoursePage = ({ courseId }: { courseId: string }) => {
  return (
    <>
      <div>course page - {courseId}</div>
    </>
  );
};

export default CoursePage;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await getCourses('');
  const paths = response.courses.map((course) => ({ params: { id: course.id.toString() } }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const courseId = id;
  return { props: { courseId } };
};
