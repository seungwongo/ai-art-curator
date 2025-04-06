const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");
const { validationResult } = require("express-validator");

// OpenAI API 초기화
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 작품 분석 프롬프트 생성
const generatePrompt = () => {
  return `당신은 미술 전문가입니다. 이 이미지에 있는 미술 작품에 대해 다음 정보를 제공해주세요:
  
  1. 작품 제목 (추정)
  2. 작가 (추정)
  3. 제작 시기 (추정)
  4. 예술 양식/사조
  5. 주요 기법 및 매체
  6. 작품의 주제 및 내용 분석
  7. 시대적 배경 및 역사적 맥락
  8. 작가의 다른 주요 작품들
  
  응답은 JSON 형식으로 다음 키를 포함하세요: title, artist, period, style, technique, analysis, historical_context, other_works
  
  작품에 대한 확실한 정보가 없다면, 가능한 한 근거를 바탕으로 추정하되 추정임을 명시해주세요.`;
};

// 파일 업로드를 통한 작품 분석
exports.analyzeArtwork = async (req, res, next) => {
  try {
    // 파일 업로드 확인
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "이미지 파일이 업로드되지 않았습니다." });
    }

    const filePath = req.file.path;

    // 이미지 파일을 base64로 변환
    const imageBuffer = fs.readFileSync(filePath);
    const base64Image = imageBuffer.toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${base64Image}`;

    // GPT API 요청
    const response = await openai.chat.completions.create({
      model: process.env.GPT_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: generatePrompt() },
            {
              type: "image_url",
              image_url: {
                url: dataURI,
                detail: "high", // 고해상도 분석 사용
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    });

    // 임시 업로드 파일 삭제
    fs.unlinkSync(filePath);

    // GPT의 응답 파싱 시도
    try {
      // 응답 텍스트에서 JSON 부분만 추출 시도
      const responseText = response.choices[0].message.content;
      let jsonData;

      try {
        // 전체 응답이 JSON인 경우
        jsonData = JSON.parse(responseText);
      } catch (e) {
        // JSON 형식이 아닌 경우, JSON 부분만 추출 시도
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          jsonData = JSON.parse(jsonMatch[0]);
        } else {
          // 구조화되지 않은 텍스트 응답
          jsonData = {
            raw_analysis: responseText,
            title: "분석 불가",
            artist: "알 수 없음",
            period: "알 수 없음",
            style: "알 수 없음",
            technique: "알 수 없음",
            analysis: "작품 분석에 실패했습니다. 다른 이미지를 시도해주세요.",
            historical_context: "",
            other_works: [],
          };
        }
      }

      res.json({
        success: true,
        data: jsonData,
      });
    } catch (error) {
      console.error("응답 파싱 에러:", error);
      res.status(500).json({
        success: false,
        message: "응답 처리 중 오류가 발생했습니다",
        raw_response: response.choices[0].message.content,
      });
    }
  } catch (error) {
    console.error("API 요청 에러:", error);
    next(error);
  }
};

// Base64 이미지 데이터를 이용한 작품 분석
exports.analyzeArtworkBase64 = async (req, res, next) => {
  try {
    const { imageData } = req.body;

    if (!imageData) {
      return res
        .status(400)
        .json({ message: "이미지 데이터가 제공되지 않았습니다." });
    }

    // GPT API 요청
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: generatePrompt() },
            {
              type: "image_url",
              image_url: {
                url: imageData,
                detail: "high", // 고해상도 분석 사용
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    });

    // GPT의 응답 파싱 시도
    try {
      // 응답 텍스트에서 JSON 부분만 추출 시도
      const responseText = response.choices[0].message.content;
      let jsonData;

      try {
        // 전체 응답이 JSON인 경우
        jsonData = JSON.parse(responseText);
      } catch (e) {
        // JSON 형식이 아닌 경우, JSON 부분만 추출 시도
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          jsonData = JSON.parse(jsonMatch[0]);
        } else {
          // 구조화되지 않은 텍스트 응답
          jsonData = {
            raw_analysis: responseText,
            title: "분석 불가",
            artist: "알 수 없음",
            period: "알 수 없음",
            style: "알 수 없음",
            technique: "알 수 없음",
            analysis: "작품 분석에 실패했습니다. 다른 이미지를 시도해주세요.",
            historical_context: "",
            other_works: [],
          };
        }
      }

      res.json({
        success: true,
        data: jsonData,
      });
    } catch (error) {
      console.error("응답 파싱 에러:", error);
      res.status(500).json({
        success: false,
        message: "응답 처리 중 오류가 발생했습니다",
        raw_response: response.choices[0].message.content,
      });
    }
  } catch (error) {
    console.error("API 요청 에러:", error);
    next(error);
  }
};
