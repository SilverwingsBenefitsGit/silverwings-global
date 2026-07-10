$script = "Irene. This is for you. Not a boardroom pitch. Just me, showing you what your belief built. ... Two years ago, you believed in me when nobody else would. You handed me fifteen thousand pounds and said keep going. I don't think either of us knew what that would turn into. ... Eight hundred and nine thousand pounds in client revenue. Bank verified. A hundred and twenty K a month coming in now, and climbing. A thousand families helped to get what they were owed. Ninety-four percent success rate. Fifty-four times return on your original fifteen K. ... I'll be straight with you, because I always am. Year one, I borrowed a hundred and twenty K from iwoca and BizCap to survive. Revolving facilities to bridge the gaps while we figured it out. Thirty percent's already repaid. No equity given. No covenants. Just first-year survival capital. You'd see it in the bank statement anyway. You deserve the full picture. ... Here's how it works now. A pensioner calls us. Our voice AI runs the interview. The AI enhances their answers. We submit online. Ninety-four percent get awarded. Then one benefit triggers the next. Attendance Allowance unlocks Pension Credit, which unlocks Council Tax Reduction. Three fees from one phone call. Eighteen hundred pounds. Same AI. No extra cost. ... And we've built open banking auto-billing. When the benefit lands in the client's bank account, we detect it automatically. Invoice goes out. PayPal Pay in 3 link attached. Payment collected. No chasing. No bad debt. Nobody touches it. ... Twelve months ago we were handling thirty families a month. Six months ago, a hundred and fifty. Last month, two fifty. Voice AI does the work of twelve staff. Three hundred K a year we don't spend on wages. ... And ITV starts in August. They match every pound we spend on advertising. No cap. Six months of daytime TV. You know ITV, Irene. You advertise Hays Travel with them. You know what matched funding does. ... So here's what I'm asking. Two hundred and fifty thousand pounds. A loan, not equity. You keep no stake. I'll pay it back. ... A hundred K goes into ITV. They match it, so that's two hundred K in airtime. Seventy-five K bridges the operating gap while the revenue catches up. Fifty K scales the voice AI for the volume surge. Twenty-five K preps the international expansion. We've mapped thirty-eight countries. ... Repayment. Twelve and a half K a month, starting September. Twenty months. That's twenty percent of net cashflow. Fully covered. ... What does two fifty become? With ITV running, five thousand families in six months. Four million in revenue. You're repaid from a fraction of that. ... And Irene. This isn't just Silverwings anymore. I've built twenty-four products. Four hundred thousand lines of code. All with AI. The Orion Constellation. Silverwings, Thuban, Nova, Navisynth, SickDay AI, Afterlight. I design them. Kenny tests them. The dev team hardens them. Darren sells them. AI builds at a hundred times the speed of a normal developer. That's how one person built all of this. ... From your fifteen thousand pounds, Irene. Eight hundred and nine K in revenue. A thousand families helped. Twenty-four products built. And we're just getting started. ... Thank you. For everything."

$body = @{
    model_id = 'sonic-2'
    transcript = $script
    voice = @{
        mode = 'id'
        id = '62ae83ad-4f6a-430b-af41-a9bede9286ca'
    }
    output_format = @{
        container = 'mp3'
        bit_rate = 128000
        sample_rate = 44100
    }
    language = 'en'
} | ConvertTo-Json -Depth 5

$headers = @{
    'X-API-Key' = 'sk_car_pVHiL3kM3aYmw8B2Zssdx8'
    'Cartesia-Version' = '2024-06-10'
    'Content-Type' = 'application/json'
}

$outPath = 'C:\Users\Administrator\.verdent\verdent-projects\kenny-has-told-me\silverwings-global\video\public\vo-irene-presentation.mp3'
Invoke-RestMethod -Uri 'https://api.cartesia.ai/tts/bytes' -Method Post -Headers $headers -Body $body -OutFile $outPath
Write-Host "Done"
