-- Seed data for Video Production Management App
-- Insert sample data for development and testing

-- Insert sample users
INSERT INTO users (name, email, password_hash, role) VALUES
('John Doe', 'john@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'),
('Jane Smith', 'jane@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user'),
('Mike Johnson', 'mike@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user'),
('Sarah Wilson', 'sarah@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user');

-- Insert sample projects
INSERT INTO projects (title, description, status, progress, owner_id, due_date) VALUES
('Summer Campaign 2024', 'A comprehensive summer marketing campaign featuring multiple video assets', 'Production', 65, 1, '2024-09-15'),
('Corporate Training Video', 'Internal training video for new employee onboarding', 'Pre-production', 30, 1, '2024-08-30'),
('Product Launch Promo', 'Promotional video for new product launch', 'Development', 15, 2, '2024-10-01');

-- Update phases for existing projects (phases are auto-created by trigger)
UPDATE phases SET status = 'completed', progress = 100 WHERE project_id = 1 AND name IN ('Development', 'Pre-production');
UPDATE phases SET status = 'in_progress', progress = 65 WHERE project_id = 1 AND name = 'Production';

UPDATE phases SET status = 'completed', progress = 100 WHERE project_id = 2 AND name = 'Development';
UPDATE phases SET status = 'in_progress', progress = 30 WHERE project_id = 2 AND name = 'Pre-production';

-- Insert sample tasks
INSERT INTO tasks (phase_id, title, description, status, priority, assigned_to, due_date) VALUES
-- Summer Campaign tasks
(3, 'Film main scenes', 'Capture all primary footage for the campaign', 'in_progress', 'high', 2, '2024-08-20'),
(3, 'Record B-roll footage', 'Additional supporting footage and cutaways', 'pending', 'medium', 3, '2024-08-22'),
(4, 'Video editing', 'Edit and assemble final video', 'pending', 'high', 4, '2024-09-05'),
(4, 'Color correction', 'Professional color grading and correction', 'pending', 'medium', 4, '2024-09-10'),

-- Corporate Training tasks
(6, 'Script review', 'Final review and approval of training script', 'completed', 'high', 1, '2024-07-25'),
(6, 'Location setup', 'Prepare training room for filming', 'in_progress', 'medium', 3, '2024-08-15'),
(7, 'Talent coordination', 'Schedule and coordinate with training presenters', 'pending', 'high', 2, '2024-08-18');

-- Insert team members
INSERT INTO team_members (project_id, user_id, role) VALUES
(1, 1, 'admin'),
(1, 2, 'editor'),
(1, 3, 'editor'),
(1, 4, 'viewer'),
(2, 1, 'admin'),
(2, 2, 'editor'),
(2, 3, 'viewer'),
(3, 2, 'admin'),
(3, 3, 'editor');

-- Insert sample media
INSERT INTO media (project_id, filename, original_name, file_type, file_size, category, description, url, uploaded_by) VALUES
(1, 'location-scout-1.jpg', 'downtown_rooftop.jpg', 'image/jpeg', 2048576, 'location', 'Downtown rooftop location for campaign shoot', '/uploads/location-scout-1.jpg', 1),
(1, 'cast-headshots.pdf', 'talent_profiles.pdf', 'application/pdf', 5242880, 'cast', 'Headshots and profiles of selected talent', '/uploads/cast-headshots.pdf', 2),
(2, 'training-script-v2.docx', 'training_script_final.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 1048576, 'script', 'Final approved training script', '/uploads/training-script-v2.docx', 1);

-- Insert sample AI suggestions
INSERT INTO ai_suggestions (project_id, user_id, suggestion_type, prompt, response) VALUES
(1, 1, 'location', 'I need urban locations for a summer campaign video', 
'[{"title": "Urban Rooftop", "description": "Modern city skyline backdrop", "pros": ["Great lighting", "Urban aesthetic"], "cons": ["Weather dependent"], "cost": "$500-800/day"}]'),
(2, 1, 'scheduling', 'Help me plan a 3-day corporate training video shoot', 
'[{"phase": "Pre-production", "duration": "1 day", "tasks": ["Setup", "Equipment check"], "timeline": "Day 1"}]');

-- Insert sample notifications
INSERT INTO notifications (user_id, project_id, type, title, message) VALUES
(2, 1, 'deadline', 'Upcoming Deadline', 'Film main scenes task is due in 2 days'),
(3, 1, 'assignment', 'New Task Assignment', 'You have been assigned to record B-roll footage'),
(1, 2, 'milestone', 'Phase Complete', 'Development phase has been completed for Corporate Training Video');
