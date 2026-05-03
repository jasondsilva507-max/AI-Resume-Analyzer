# ResumeAI Pro — API Documentation

Base URL: `http://localhost:5000/api`

All protected routes require: `Authorization: Bearer <token>`

---

## Authentication

### POST /auth/signup
Create a new account.
```json
Body: { "name": "Jane Smith", "email": "jane@example.com", "password": "password123" }
Response: { "success": true, "token": "...", "user": { "id", "name", "email", "plan" } }
```

### POST /auth/login
```json
Body: { "email": "jane@example.com", "password": "password123" }
Response: { "success": true, "token": "...", "user": {...} }
```

### POST /auth/google
Google OAuth token exchange.
```json
Body: { "token": "<google-id-token>" }
```

### POST /auth/forgot-password
```json
Body: { "email": "jane@example.com" }
```

### POST /auth/reset-password
```json
Body: { "token": "...", "password": "newpassword123" }
```

### GET /auth/me  🔒
Returns the authenticated user object.

---

## Resume

### POST /resume/parse  🔒
Upload a PDF/DOCX/TXT file for text extraction.
```
Content-Type: multipart/form-data
Field: resume (file)
Response: { "success": true, "text": "...", "wordCount": 450 }
```

### POST /resume/analyze  🔒
Run AI analysis on resume text.
```json
Body: {
  "resumeText": "John Smith...",
  "jobDesc": "We are looking for...",  // optional
  "saveName": "My Resume v2"          // optional
}
Response: {
  "success": true,
  "analysis": {
    "overall_score": 74,
    "ats_score": 68,
    "recruiter_score": 79,
    "readability_score": 82,
    "sections": { ... },
    "keywords_found": [...],
    "keywords_missing": [...],
    "strengths": [...],
    "weaknesses": [...],
    "suggestions": [...],
    "grammar_issues": [...],
    "formatting_issues": [...],
    "job_match_percent": 67,
    "summary": "..."
  },
  "resumeId": "..."
}
```

### GET /resume  🔒
Get all resumes for the authenticated user.
```
Query: ?page=1&limit=10&archived=false
```

### GET /resume/:id  🔒
Get a single resume with all analyses.

### DELETE /resume/:id  🔒
Delete a resume and all its analyses.

---

## Reports

### GET /reports  🔒
Get all analysis reports for the user (across all resumes).

### GET /reports/:resumeId/:analysisId  🔒
Get a specific analysis report.

---

## User

### GET /user/usage  🔒
Get usage stats (analyses used, plan limits).

### PUT /user/profile  🔒
```json
Body: { "name": "New Name", "avatar": "https://..." }
```

### DELETE /user/account  🔒
Permanently delete account and all data.

---

## Admin  🔒 (admin role required)

### GET /admin/stats
Platform-wide statistics.

### GET /admin/users
```
Query: ?page=1&limit=20&plan=pro&search=john
```

### PATCH /admin/users/:id
```json
Body: { "plan": "pro", "role": "admin" }
```

### DELETE /admin/users/:id
Delete user and all their data.

---

## Error Response Format
```json
{
  "success": false,
  "message": "Human-readable error message"
}
```

## Rate Limits
- Global: 200 requests / 15 minutes
- AI endpoints: 5 requests / minute
- Free plan: 3 analyses / month
