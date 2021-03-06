-- BLOCK select_and_auth
SELECT
    to_json(q) AS question,
    to_json(top) AS topic,
    tags_for_question(q.id) AS tags,
    assessments_for_question(q.id, ci.id) AS assessments
FROM
    questions as q
    JOIN topics as top ON (top.id = q.topic_id),
    course_instances AS ci
WHERE
    q.id = $question_id
    AND ci.id = $course_instance_id
    AND q.course_id = ci.course_id
    AND q.deleted_at IS NULL;
