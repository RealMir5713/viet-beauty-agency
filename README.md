# Viet Beauty Agency

Website tinh gon cho Viet Beauty Agency, tap trung vao dich vu Facebook/Instagram Ads, landing page, booking form va theo doi lead cho spa, salon va beauty business tai Viet Nam.

## Deploy

Day la static website, co the deploy truc tiep len Vercel tu thu muc goc cua project.

## Booking form integration

The booking form posts to `/api/lead`.

Required Vercel environment variables:

```text
GOOGLE_SHEET_ID=1YjdaEGDuUs2Sqo7823bs2RGrE4_geJkGfRmNcFmDG5o
GOOGLE_SHEET_NAME=Sheet1
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_PRIVATE_KEY_B64=optional-base64-version-of-the-private-key
TELEGRAM_BOT_TOKEN=123456789:your-telegram-bot-token
TELEGRAM_CHAT_ID=-1003925890396
```

Google Sheets setup:

1. Create a Google Cloud service account.
2. Enable Google Sheets API for the project.
3. Create a JSON key for the service account.
4. Share the spreadsheet with the service account email as Editor.
5. Add the service account email and private key to Vercel environment variables.

If Vercel has trouble with multiline private keys, use `GOOGLE_PRIVATE_KEY_B64` instead:

```powershell
[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes((Get-Content .\service-account.json -Raw | ConvertFrom-Json).private_key))
```

Telegram setup:

1. Create a bot with BotFather and copy the bot token.
2. Add the bot to the Telegram group.
3. Give the bot permission to post messages.
4. Add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in Vercel.

Suggested Sheet1 header row:

```text
Timestamp | Ho va ten | Ten spa/salon | So dien thoai/Zalo | Email | Thanh pho/khu vuc | Loai hinh | Website/Facebook | Muc tieu | Ngan sach | Ghi chu | Source URL | User Agent
```
