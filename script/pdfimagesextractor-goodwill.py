import fitz  # PyMuPDF
import os
import argparse
from PIL import Image
import pytesseract
from PIL import ImageEnhance
import re

# This script extracts images from pdf file and use tesseract to extract text below the images region. This text contains the code and dimension of each image. It saves each with the code and dimensions in the filename in this format "code_dimension.png" and store the images inside assets/images/manufacturer folder.

def extract_images_and_regions(pdf_path, manufacturer, start_page=1):
    # Construct output directory with manufacturer name
    output_dir = os.path.join("assets/images", manufacturer)
    os.makedirs(output_dir, exist_ok=True)

    # Set Tesseract path if not in PATH (optional, adjust if needed)
    # pytesseract.pytesseract.tesseract_cmd = '/usr/bin/tesseract'  # Uncomment and adjust for your system

    doc = fitz.open(pdf_path)

    for page_index in range(start_page - 1, len(doc)):
        page = doc[page_index]
        blocks = page.get_text("dict")["blocks"]

        img_count = 0
        for b in blocks:
            if b["type"] == 1:  # image block
                img_count += 1
                bbox = b["bbox"]  # [x0, y0, x1, y1]

                # Save raw image bytes directly
                image_bytes = b["image"]
                img_filename = f"page{page_index + 1}_img{img_count}.png"
                img_filepath = os.path.join(output_dir, img_filename)
                with open(img_filepath, "wb") as f:
                    f.write(image_bytes)

                # Crop a region below the image bbox for nearby text (adjust as needed)
                x0, y0, x1, y1 = bbox
                crop_margin = 5     # gap between image and crop
                crop_height = 100   # Height of cropped region

                # Make sure crop rect is inside page boundaries
                crop_top = y1 + crop_margin
                crop_bottom = crop_top + crop_height
                page_rect = page.rect
                if crop_bottom > page_rect.y1:
                    crop_bottom = page_rect.y1
                if crop_top > page_rect.y1:
                    crop_top = page_rect.y1  # no crop if beyond page

                crop_rect = fitz.Rect(x0, crop_top, x1, crop_bottom)

                cropped_pix = page.get_pixmap(clip=crop_rect, dpi=300)
                cropped_filename = f"page{page_index + 1}_img{img_count}_below.png"
                cropped_filepath = os.path.join(output_dir, cropped_filename)
                cropped_pix.save(cropped_filepath)

                # Extract text from the cropped region using OCR with preprocessing
                with Image.open(cropped_filepath) as img:
                    img = img.convert('L')  # Convert to grayscale
                    enhancer = ImageEnhance.Contrast(img)
                    img = enhancer.enhance(2.0)  # Increase contrast
                    ocr_text = pytesseract.image_to_string(img).strip()

                # Format the extracted text to remove prefixes and keep code and dimensions
                formatted_text = ocr_text.strip()  # Default to raw text
                if '\n' in ocr_text:
                    parts = [p.strip() for p in ocr_text.split('\n') if p.strip()]
                    if len(parts) >= 2:
                        code = next((p for p in parts[0].split() if p.isdigit()), parts[0].split()[0])
                        dims = parts[1].replace('MM', '').strip()
                        formatted_text = f"{code}_{dims}"
                    elif len(parts) == 1:
                        sub_parts = parts[0].split()
                        if len(sub_parts) >= 2:
                            code = next((p for p in sub_parts if p.isdigit()), sub_parts[0])
                            dims = sub_parts[-1].replace('MM', '').strip()
                            formatted_text = f"{code}_{dims}"
                else:
                    sub_parts = ocr_text.split()
                    if len(sub_parts) >= 2:
                        code = next((p for p in sub_parts if p.isdigit()), sub_parts[0])
                        dims = sub_parts[-1].replace('MM', '').strip()
                        formatted_text = f"{code}_{dims}"

                # Rename the main image with formatted text
                new_img_filename = f"{formatted_text}.png"
                new_img_filepath = os.path.join(output_dir, new_img_filename)
                os.rename(img_filepath, new_img_filepath)

                # Delete the cropped region file
                if os.path.exists(cropped_filepath):
                    os.remove(cropped_filepath)

                # Validate and delete if format is incorrect (code must be 5+ digits)
                if not re.match(r'^\d{5,}_\d+X\d+\.png$', new_img_filename):
                    if os.path.exists(new_img_filepath):
                        os.remove(new_img_filepath)
                        print(f"Deleted image {new_img_filepath} due to invalid format (code must be 5+ digits)")
                    continue

                print(f"Saved and renamed image: {new_img_filepath}")
                print(f"Extracted text from cropped region: '{ocr_text}'")
                print(f"Formatted text: '{formatted_text}'")
                print("-" * 50)

    doc.close()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Extract images and below text regions from PDF")
    parser.add_argument("pdf_path", help="Path to the PDF file")
    parser.add_argument("manufacturer", help="Manufacturer name for directory and storage")
    parser.add_argument("--start-page", type=int, default=1, help="Page number to start extraction (1-based)")
    args = parser.parse_args()

    extract_images_and_regions(args.pdf_path, args.manufacturer, args.start_page)