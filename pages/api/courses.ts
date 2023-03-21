import http from './core';

export const getCourses = async (type: 'online_live' | 'premium' | ''): Promise<GetCoursesRes> => {
  return http.get(`/courses?type=${type}`);
};

export type CourseStatus = 'OPENED' | 'APPLIED' | 'CLOSED';
export type PaymentStatus = 'NOT_EXISTING_SUBSCRIPTION' | 'PENDING' | 'PAID';

export type Course = {
  id: number;
  title: string;
  subTitle: string;
  content: string;
  imageLink: string;
  count: number;
  dueDate: string;
  courseStatus: CourseStatus;
  paymentStatus: PaymentStatus;
  link: string;
};

export type GetCoursesRes = {
  courses: Omit<Course, 'paymentStatus'>[];
};
