import React from 'react';
import { useParams } from 'react-router';
import { useShow } from '@refinedev/core';
import type { Class } from '@/types';
import { ShowView, ShowViewHeader } from '@/components/refine-ui/views/show-view';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { bannerPhoto } from '@/lib/cloudinary';

const Show = () => {
  const { id } = useParams();
  const { query } = useShow<Class>({ resource: 'classes', id });

  const rawData = query.data as Partial<{ data: Class }> | Class | undefined;
  const classDetails = rawData && typeof rawData === 'object' && 'data' in rawData && rawData.data
    ? rawData.data
    : (rawData as Class | undefined);

  const { isLoading, isError } = query;

  if (isLoading || isError || !classDetails) {
    return (
      <ShowView className="class-view class-show">
        <ShowViewHeader resource="classes" title="Class Details" />
        <p className="state-message">
          {isLoading ? 'Loading class details...' : isError ? 'Error fetching class details.' : 'Class details not found.'}
        </p>
      </ShowView>
    );
  }

  const teacherName = typeof classDetails.teacher === 'object' && classDetails.teacher !== null && 'name' in classDetails.teacher
    ? classDetails.teacher.name
    : typeof classDetails.teacher === 'string'
      ? classDetails.teacher
      : classDetails.teacherId ?? 'N/A';
  const teacherEmail = typeof classDetails.teacher === 'object' && classDetails.teacher !== null && 'email' in classDetails.teacher
    ? classDetails.teacher.email
    : 'N/A';
  const subjectName = typeof classDetails.subject === 'object' && classDetails.subject !== null && 'name' in classDetails.subject
    ? classDetails.subject.name
    : `Subject ${classDetails.subjectId ?? 'N/A'}`;
  const subjectCode = typeof classDetails.subject === 'object' && classDetails.subject !== null && 'code' in classDetails.subject
    ? classDetails.subject.code
    : 'N/A';
  const departmentName = typeof classDetails.department === 'object' && classDetails.department !== null && 'name' in classDetails.department
    ? classDetails.department.name
    : 'N/A';
  const departmentDescription = typeof classDetails.department === 'object' && classDetails.department !== null && 'description' in classDetails.department && classDetails.department.description
    ? classDetails.department.description
    : 'No department description available.';
  const teacherInitials = teacherName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part: string) => part[0]?.toUpperCase())
    .join('');

  const placeholderUrl = `https://placehold.co/600x400?text=${encodeURIComponent(teacherInitials || 'NA')}`;
  const bannerImageUrl = classDetails.bannerUrl
    ? bannerPhoto(classDetails.bannerCldPubId || classDetails.bannerUrl, subjectName)
    : placeholderUrl;

  return (
    <ShowView className="class-view class-show">
      <ShowViewHeader resource="classes" title="Class Details" />
      <div className="banner">
        <img src={bannerImageUrl} alt={classDetails.name} className="w-full h-48 object-cover rounded-md" />
      </div>
      <Card className="details-card p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
            <h1 className="text-2xl font-bold">{classDetails.name}</h1>
            <p className="text-muted-foreground">{classDetails.description || 'No description provided.'}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{classDetails.capacity} Spots</Badge>
            <Badge variant={classDetails.status === 'active' ? 'default' : 'secondary'}>
              {classDetails.status.toUpperCase()}
            </Badge>
          </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <p className="text-sm font-medium">Instructor</p>
              <div className="mt-2 flex items-center gap-3">
                <img src={classDetails.teacher?.image ?? placeholderUrl} alt={teacherName} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold">{teacherName}</p>
                  <p className="text-sm text-muted-foreground">{teacherEmail}</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm font-medium">Department</p>
              <div className="mt-2">
                <p className="font-semibold">{departmentName}</p>
                <p className="text-sm text-muted-foreground">{departmentDescription}</p>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm font-medium">Subject</p>
              <div className="mt-2">
                <Badge variant="outline">Code: {subjectCode}</Badge>
                <p className="mt-2 font-semibold">{subjectName}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h2 className="text-lg font-semibold">Join Class</h2>
            <ol className="mt-2 list-decimal pl-5 text-sm text-muted-foreground">
              <li>Ask your teacher for the invite code.</li>
              <li>Click the join button.</li>
              <li>Paste the code and confirm.</li>
            </ol>
            <Button size="lg" className="mt-4 w-full">
              Join Class
            </Button>
          </div>
        </div>
      </Card>
    </ShowView>
  );
};

export default Show