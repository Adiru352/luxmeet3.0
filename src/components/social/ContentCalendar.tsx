import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { format, startOfWeek, addDays } from 'date-fns';
import { motion } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Edit,
  Trash,
  Copy,
} from 'lucide-react';
import type { SocialPost } from '../../types/social';

interface ContentCalendarProps {
  posts: SocialPost[];
  onPostEdit: (post: SocialPost) => void;
  onPostDelete: (postId: string) => void;
  onPostDuplicate: (post: SocialPost) => void;
}

export function ContentCalendar({
  posts,
  onPostEdit,
  onPostDelete,
  onPostDuplicate,
}: ContentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [draggedPost, setDraggedPost] = useState<SocialPost | null>(null);

  const weekStart = startOfWeek(currentDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getPostsForDate = (date: Date) =>
    posts.filter(
      (post) =>
        format(new Date(post.scheduledFor), 'yyyy-MM-dd') ===
        format(date, 'yyyy-MM-dd')
    );

  const handleDragEnd = (result: any) => {
    if (!result.destination || !draggedPost) return;

    const [sourceDate, sourceIndex] = result.source.droppableId.split('-');
    const [destDate, destIndex] = result.destination.droppableId.split('-');

    // Update post scheduling logic here
    console.log('Move post from', sourceDate, 'to', destDate);
    setDraggedPost(null);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow">
      {/* Calendar Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <CalendarIcon className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-medium text-gray-900">
              Content Calendar
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() =>
                setCurrentDate(addDays(currentDate, -7))
              }
              className="rounded-full p-1 hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <span className="text-sm font-medium text-gray-600">
              {format(weekStart, 'MMM d')} -{' '}
              {format(addDays(weekStart, 6), 'MMM d, yyyy')}
            </span>
            <button
              onClick={() => setCurrentDate(addDays(currentDate, 7))}
              className="rounded-full p-1 hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {weekDays.map((date) => (
            <div key={date.toString()} className="bg-white">
              {/* Day Header */}
              <div
                className={`border-b border-gray-200 p-2 text-center ${
                  format(date, 'yyyy-MM-dd') ===
                  format(new Date(), 'yyyy-MM-dd')
                    ? 'bg-blue-50'
                    : ''
                }`}
              >
                <div className="text-xs font-medium text-gray-500">
                  {format(date, 'EEE')}
                </div>
                <div className="mt-1 text-sm font-medium text-gray-900">
                  {format(date, 'd')}
                </div>
              </div>

              {/* Posts Container */}
              <Droppable droppableId={`${format(date, 'yyyy-MM-dd')}`}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="min-h-[150px] p-2"
                  >
                    {getPostsForDate(date).map((post, index) => (
                      <Draggable
                        key={post.id}
                        draggableId={post.id}
                        index={index}
                      >
                        {(provided) => (
                          <motion.div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-2 rounded-lg border border-gray-200 bg-white p-2 shadow-sm"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  {post.platforms.map((platform) => (
                                    <span
                                      key={platform}
                                      className="inline-block rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                                    >
                                      {platform}
                                    </span>
                                  ))}
                                </div>
                                <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                                  {post.content}
                                </p>
                              </div>
                              <div className="relative">
                                <button className="rounded-full p-1 hover:bg-gray-100">
                                  <MoreVertical className="h-4 w-4 text-gray-400" />
                                </button>
                                {/* Dropdown menu for post actions */}
                                <div className="absolute right-0 mt-2 hidden w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                                  <button
                                    onClick={() => onPostEdit(post)}
                                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => onPostDuplicate(post)}
                                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    <Copy className="mr-2 h-4 w-4" />
                                    Duplicate
                                  </button>
                                  <button
                                    onClick={() => onPostDelete(post.id)}
                                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                  >
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}