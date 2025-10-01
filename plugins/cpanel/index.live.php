<!DOCTYPE html>
<html>
<head>
    <title>VIBER Settings</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-5">
        <h1>VIBER Settings</h1>
        <p>Configure the VIBER platform by providing the necessary API keys and endpoints below.</p>
        <form action="" method="post">
            <div class="form-group">
                <label for="jwt_secret">JWT Secret</label>
                <input type="text" class="form-control" id="jwt_secret" name="jwt_secret">
            </div>
            <div class="form-group">
                <label for="google_ai_studio_api_key">Google AI Studio API Key</label>
                <input type="text" class="form-control" id="google_ai_studio_api_key" name="google_ai_studio_api_key">
            </div>
            <div class="form-group">
                <label for="openai_api_key">OpenAI API Key</label>
                <input type="text" class="form-control" id="openai_api_key" name="openai_api_key">
            </div>
            <button type="submit" class="btn btn-primary">Save Settings</button>
        </form>
    </div>
</body>
</html>