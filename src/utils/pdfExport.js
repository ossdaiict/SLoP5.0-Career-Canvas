import html2pdf from "html2pdf.js";

export function exportResumePDF(previewRef, personName = "YourName") {
  if (!previewRef?.current) return;

  const element = previewRef.current;
  const downloadBtn = element.querySelector("button");
  const previewFoot = element.querySelector(".preview-foot");
  
  const originalStyles = {
    card: element.querySelector('.preview-card')?.style.cssText || '',
    name: element.querySelector('.preview-name')?.style.cssText || '',
    sectionTitles: [],
    sections: [],
    chips: [],
    minis: []
  };

  element.querySelectorAll('.preview-section-title').forEach(el => {
    originalStyles.sectionTitles.push(el.style.cssText);
  });
  
  element.querySelectorAll('.preview-section').forEach(el => {
    originalStyles.sections.push(el.style.cssText);
  });

  element.querySelectorAll('.chip').forEach(el => {
    originalStyles.chips.push(el.style.cssText);
  });

  element.querySelectorAll('.preview-mini').forEach(el => {
    originalStyles.minis.push(el.style.cssText);
  });

  if (downloadBtn) downloadBtn.style.display = "none";
  if (previewFoot) previewFoot.style.display = "none";

  const card = element.querySelector('.preview-card');
  if (card) {
    card.style.padding = "48px 40px";
    card.style.background = "#ffffff";
    card.style.border = "4px solid #667eea";
  }

  const name = element.querySelector('.preview-name');
  if (name) {
    name.style.fontSize = "28px";
    name.style.color = "#1a1a2e";
    name.style.borderBottom = "3px solid #667eea";
    name.style.paddingBottom = "8px";
    name.style.marginBottom = "12px";
  }

  element.querySelectorAll('.preview-section-title').forEach(el => {
    el.style.fontSize = "16px";
    el.style.color = "#667eea";
    el.style.textTransform = "uppercase";
    el.style.letterSpacing = "1px";
    el.style.fontWeight = "800";
    el.style.marginTop = "20px";
    el.style.marginBottom = "12px";
  });

  element.querySelectorAll('.preview-section').forEach(el => {
    el.style.marginBottom = "20px";
    el.style.paddingTop = "12px";
  });

  element.querySelectorAll('.chip').forEach(el => {
    el.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    el.style.color = "#ffffff";
    el.style.padding = "8px 14px";
    el.style.fontWeight = "600";
    el.style.border = "none";
  });

  element.querySelectorAll('.preview-mini').forEach(el => {
    el.style.padding = "12px";
    el.style.background = "#f8f9fa";
    el.style.borderLeft = "3px solid #764ba2";
    el.style.borderRadius = "6px";
    el.style.marginBottom = "16px";
  });

  const filename = `resume_${personName.replace(/\s+/g, "_")}.pdf`;

  const opt = {
    margin: [0.3, 0.3, 0.3, 0.3],
    filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, logging: false, useCORS: true },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save().finally(() => {
    if (card) card.style.cssText = originalStyles.card;
    if (name) name.style.cssText = originalStyles.name;
    
    element.querySelectorAll('.preview-section-title').forEach((el, i) => {
      el.style.cssText = originalStyles.sectionTitles[i] || '';
    });
    
    element.querySelectorAll('.preview-section').forEach((el, i) => {
      el.style.cssText = originalStyles.sections[i] || '';
    });
    
    element.querySelectorAll('.chip').forEach((el, i) => {
      el.style.cssText = originalStyles.chips[i] || '';
    });
    
    element.querySelectorAll('.preview-mini').forEach((el, i) => {
      el.style.cssText = originalStyles.minis[i] || '';
    });
    
    if (downloadBtn) downloadBtn.style.display = "block";
    if (previewFoot) previewFoot.style.display = "block";
  });
}