# Database Schema — ResumeAI Pro

Database: MongoDB (Mongoose ODM)

---

## Collection: users

| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Auto-generated |
| name | String | Display name |
| email | String | Unique, indexed |
| password | String | bcrypt hashed, never returned |
| googleId | String | Google OAuth ID |
| avatar | String | URL to profile picture |
| plan | String | 'free' \| 'pro' \| 'team' |
| role | String | 'user' \| 'admin' |
| usage.analysesThisMonth | Number | Reset monthly |
| usage.lastResetDate | Date | For monthly reset logic |
| resetPasswordToken | String | SHA-256 hashed token |
| resetPasswordExpires | Date | 1 hour from generation |
| isEmailVerified | Boolean | Default: false |
| createdAt | Date | Auto |
| updatedAt | Date | Auto |

---

## Collection: resumes

| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Auto-generated |
| user | ObjectId | Ref: users |
| name | String | Display name |
| originalName | String | Original filename |
| fileType | String | 'pdf' \| 'docx' \| 'txt' \| 'text' |
| textContent | String | Extracted resume text |
| fileSize | Number | Bytes |
| latestScore | Number | Most recent overall score |
| isArchived | Boolean | Soft delete |
| tags | [String] | User-defined tags |
| analyses | [Analysis] | Embedded sub-documents |
| createdAt | Date | Auto |
| updatedAt | Date | Auto |

### Embedded: analyses[]

| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Auto-generated |
| overallScore | Number | 0-100 |
| atsScore | Number | 0-100 |
| recruiterScore | Number | 0-100 |
| readabilityScore | Number | 0-100 |
| jobMatchPercent | Number | 0-100, null if no JD |
| sections | Object | Per-section scores + feedback |
| keywordsFound | [String] | |
| keywordsMissing | [String] | |
| strengths | [String] | |
| weaknesses | [String] | |
| suggestions | [Object] | Before/after rewrites |
| grammarIssues | [String] | |
| formattingIssues | [String] | |
| summary | String | Overall AI assessment |
| jobDescription | String | JD used for matching |
| createdAt | Date | Auto |

---

## Indexes

```javascript
// users
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ googleId: 1 }, { sparse: true })

// resumes
db.resumes.createIndex({ user: 1, createdAt: -1 })
db.resumes.createIndex({ user: 1, isArchived: 1 })
```

---

## Sample AI Prompts

See `backend/src/services/aiService.js` for the full prompt templates.

Key prompt design principles:
1. Ask for ONLY valid JSON — no markdown, no preamble
2. Specify exact field names and types in the expected schema
3. Include examples where helpful
4. Limit resume text to 4000 chars and JD to 2000 chars to stay within token budget
5. Use `claude-sonnet-4-20250514` for best quality/cost balance
