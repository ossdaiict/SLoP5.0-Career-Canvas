import html2pdf from "html2pdf.js";

export function exportResumePDF(previewRef, personName = "YourName") {
  if (!previewRef?.current) return;

  const element = previewRef.current.cloneNode(true);
  
  const downloadBtn = element.querySelector("button");
  if (downloadBtn) downloadBtn.remove();
  
  const footer = element.querySelector('.preview-foot');
  if (footer) footer.remove();

  element.style.width = '8.5in';
  element.style.minHeight = 'auto';
  element.style.padding = '0.5in';
  element.style.backgroundColor = 'white';
  element.style.fontSize = '11pt';
  element.style.lineHeight = '1.5';
  element.style.color = '#000';
  
  const header = element.querySelector('.preview-header');
  if (header) {
    header.style.textAlign = 'center';
    header.style.marginBottom = '20px';
    header.style.paddingBottom = '16px';
    header.style.borderBottom = '2px solid #000';
  }
  
  const name = element.querySelector('.preview-name');
  if (name) {
    name.style.fontSize = '22pt';
    name.style.fontWeight = 'bold';
    name.style.marginBottom = '8px';
    name.style.textTransform = 'uppercase';
    name.style.letterSpacing = '1px';
  }
  
  const meta = element.querySelector('.preview-meta');
  if (meta) {
    meta.style.fontSize = '10pt';
    meta.style.marginBottom = '4px';
  }
  
  const location = element.querySelector('.preview-location');
  if (location) {
    location.style.fontSize = '10pt';
  }
  
  const sections = element.querySelectorAll('.preview-section');
  sections.forEach(section => {
    section.style.marginBottom = '18px';
  });
  
  const sectionTitles = element.querySelectorAll('.preview-section-title');
  sectionTitles.forEach(title => {
    title.style.fontSize = '13pt';
    title.style.fontWeight = 'bold';
    title.style.textTransform = 'uppercase';
    title.style.marginTop = '14px';
    title.style.marginBottom = '10px';
    title.style.paddingBottom = '4px';
    title.style.borderBottom = '1.5px solid #333';
    title.style.letterSpacing = '0.5px';
  });
  
  const miniBlocks = element.querySelectorAll('.preview-mini');
  miniBlocks.forEach(block => {
    block.style.marginBottom = '12px';
  });
  
  const miniTitles = element.querySelectorAll('.preview-mini-title');
  miniTitles.forEach(title => {
    title.style.fontWeight = 'bold';
    title.style.fontSize = '11pt';
    title.style.marginBottom = '3px';
  });
  
  const miniSubs = element.querySelectorAll('.preview-mini-sub');
  miniSubs.forEach(sub => {
    sub.style.fontSize = '10pt';
    sub.style.fontStyle = 'italic';
    sub.style.color = '#333';
  });
  
  const summaryText = element.querySelector('.preview-text');
  if (summaryText) {
    summaryText.style.fontSize = '10pt';
    summaryText.style.lineHeight = '1.6';
    summaryText.style.textAlign = 'justify';
  }
  
  const chips = element.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.style.display = 'inline-block';
    chip.style.margin = '4px 8px 4px 0';
    chip.style.padding = '4px 10px';
    chip.style.backgroundColor = '#f0f0f0';
    chip.style.border = '1px solid #ccc';
    chip.style.borderRadius = '3px';
    chip.style.fontSize = '10pt';
  });
  
  const lists = element.querySelectorAll('ul');
  lists.forEach(list => {
    list.style.marginTop = '6px';
    list.style.marginBottom = '6px';
    list.style.paddingLeft = '20px';
  });
  
  const listItems = element.querySelectorAll('li');
  listItems.forEach(item => {
    item.style.fontSize = '10pt';
    item.style.marginBottom = '3px';
    item.style.lineHeight = '1.5';
  });

  const tempDiv = document.createElement('div');
  tempDiv.appendChild(element);
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  document.body.appendChild(tempDiv);

  const filename = `resume_${personName.replace(/\s+/g, "_")}.pdf`;

  const opt = {
    margin: 0,
    filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2, 
      logging: false, 
      useCORS: true,
      letterRendering: true
    },
    jsPDF: { 
      unit: 'in', 
      format: 'letter', 
      orientation: 'portrait'
    }
  };

  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .finally(() => {
      document.body.removeChild(tempDiv);
    });
}