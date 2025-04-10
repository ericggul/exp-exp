import React, { useState, useRef } from "react";
import * as S from "./styles";

export default function DALLE() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generationHistory, setGenerationHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("generate");
  const [error, setError] = useState("");
  const [designContext, setDesignContext] = useState("branding");

  const promptInputRef = useRef(null);

  // Design-focused prompt starters
  const contextOptions = [
    { value: "branding", label: "Branding & Logo" },
    { value: "ui", label: "UI Elements" },
    { value: "illustration", label: "Illustration" },
    { value: "pattern", label: "Patterns & Textures" },
    { value: "typography", label: "Typography" },
  ];

  // Design-focused prompt examples
  const promptSuggestions = {
    branding: [
      "Minimalist logo for a sustainable fashion brand called 'Evergreen'",
      "Colorful, playful logo for a children's art studio called 'Creative Minds'",
      "Elegant logo for a luxury skincare brand with gold and white colors",
    ],
    ui: ["Futuristic dashboard UI with dark mode and glowing blue accents", "Minimalist mobile app interface for a meditation app", "E-commerce product card with a clean, modern aesthetic"],
    illustration: ["Cute vector-style mascot character for a tech startup", "Isometric illustration of a creative workspace", "Watercolor-style illustration of nature and technology coexisting"],
    pattern: ["Geometric seamless pattern in teals and blues for a tech brand", "Organic, flowing pattern inspired by natural forms", "Subtle background texture with a paper-like quality"],
    typography: ["Creative typographic treatment for the word 'Innovation'", "Modern 3D typography with a bold color scheme", "Hand-lettered quote about design with decorative elements"],
  };

  async function generateImage() {
    if (!prompt.trim()) {
      setError("Please enter a prompt before generating an image");
      promptInputRef.current?.focus();
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/dalle/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setImageUrl(data.imageUrl);

      // Add to history
      const newItem = {
        id: Date.now(),
        prompt,
        imageUrl: data.imageUrl,
        timestamp: new Date().toLocaleString(),
      };

      setGenerationHistory((prev) => [newItem, ...prev.slice(0, 9)]); // Keep last 10 items
    } catch (error) {
      console.error("Failed to generate image from DALL-E", error);
      setError("Failed to generate image. Please try again or check your prompt.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setPrompt(suggestion);
    promptInputRef.current?.focus();
  };

  const handleDesignContextChange = (e) => {
    setDesignContext(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateImage();
  };

  const restoreFromHistory = (item) => {
    setPrompt(item.prompt);
    setImageUrl(item.imageUrl);
    setActiveTab("generate");
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>Design with DALL-E</S.Title>
        <S.Subtitle>Generate images to inspire your design process</S.Subtitle>

        <S.Tabs>
          <S.TabButton active={activeTab === "generate"} onClick={() => setActiveTab("generate")}>
            Generate
          </S.TabButton>
          <S.TabButton active={activeTab === "history"} onClick={() => setActiveTab("history")}>
            History
          </S.TabButton>
        </S.Tabs>
      </S.Header>

      {activeTab === "generate" ? (
        <S.GenerateContainer>
          <S.PromptSection>
            <S.ContextSelector>
              <S.Label>Design Context:</S.Label>
              <S.Select value={designContext} onChange={handleDesignContextChange}>
                {contextOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </S.Select>
            </S.ContextSelector>

            <S.PromptForm onSubmit={handleSubmit}>
              <S.Label htmlFor="prompt">Describe what you want to generate:</S.Label>
              <S.TextArea id="prompt" ref={promptInputRef} value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe the image you want to create..." rows={3} />
              {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
              <S.GenerateButton type="submit" disabled={isLoading}>
                {isLoading ? "Generating..." : "Generate Image"}
              </S.GenerateButton>
            </S.PromptForm>

            <S.PromptSuggestions>
              <S.SuggestionLabel>Examples for {contextOptions.find((opt) => opt.value === designContext)?.label}:</S.SuggestionLabel>
              <S.SuggestionsWrapper>
                {promptSuggestions[designContext].map((suggestion, index) => (
                  <S.SuggestionChip key={index} onClick={() => handleSuggestionClick(suggestion)}>
                    {suggestion}
                  </S.SuggestionChip>
                ))}
              </S.SuggestionsWrapper>
            </S.PromptSuggestions>
          </S.PromptSection>

          <S.ResultsSection>
            {isLoading ? (
              <S.LoadingContainer>
                <S.LoadingIndicator>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </S.LoadingIndicator>
                <S.LoadingText>Creating your design asset...</S.LoadingText>
              </S.LoadingContainer>
            ) : imageUrl ? (
              <S.ImageContainer>
                <S.GeneratedImage src={imageUrl} alt="Generated by DALL-E" />
                <S.ImageInfo>
                  <S.PromptUsed>{prompt}</S.PromptUsed>
                  <S.DownloadLink href={imageUrl} download="dalle-generation.png" target="_blank">
                    Download Image
                  </S.DownloadLink>
                </S.ImageInfo>
              </S.ImageContainer>
            ) : (
              <S.EmptyState>
                <S.EmptyStateIcon>🖼️</S.EmptyStateIcon>
                <S.EmptyStateText>
                  Your generated image will appear here.
                  <br />
                  Enter a prompt and click "Generate Image" to start.
                </S.EmptyStateText>
              </S.EmptyState>
            )}
          </S.ResultsSection>
        </S.GenerateContainer>
      ) : (
        <S.HistoryContainer>
          {generationHistory.length === 0 ? (
            <S.EmptyState>
              <S.EmptyStateIcon>📝</S.EmptyStateIcon>
              <S.EmptyStateText>
                Your generation history will appear here.
                <br />
                Generate some images to see them in your history.
              </S.EmptyStateText>
            </S.EmptyState>
          ) : (
            <S.HistoryGrid>
              {generationHistory.map((item) => (
                <S.HistoryItem key={item.id} onClick={() => restoreFromHistory(item)}>
                  <S.HistoryImage src={item.imageUrl} alt={item.prompt} />
                  <S.HistoryInfo>
                    <S.HistoryPrompt>{item.prompt}</S.HistoryPrompt>
                    <S.HistoryTimestamp>{item.timestamp}</S.HistoryTimestamp>
                  </S.HistoryInfo>
                </S.HistoryItem>
              ))}
            </S.HistoryGrid>
          )}
        </S.HistoryContainer>
      )}

      <S.DesignTips>
        <S.TipsTitle>🎨 Design Tips</S.TipsTitle>
        <S.TipsList>
          <S.Tip>Be specific about style (e.g., "minimalist", "3D render", "watercolor")</S.Tip>
          <S.Tip>Include color preferences in your prompt</S.Tip>
          <S.Tip>Specify lighting and mood for more refined results</S.Tip>
          <S.Tip>Use references to famous artists or design movements</S.Tip>
        </S.TipsList>
      </S.DesignTips>
    </S.Container>
  );
}
