from PIL import Image

def remove_white_background(input_image_path, output_image_path, lower=180, upper=255):
    """
    Remove (or soften) white backgrounds by converting near-white to transparent.
    A smooth blend between 'lower' and 'upper' brightness thresholds is applied
    so that edges around text remain crisp but not harsh.
    
    :param input_image_path: Path to the input image
    :param output_image_path: Path to save the processed image
    :param lower: Lower brightness threshold (below this => fully opaque)
    :param upper: Upper brightness threshold (above this => fully transparent)
    """
    image = Image.open(input_image_path).convert("RGBA")
    pixels = image.load()

    for y in range(image.height):
        for x in range(image.width):
            r, g, b, a = pixels[x, y]

            # Calculate brightness as average of R, G, B
            brightness = (r + g + b) / 3

            if brightness <= lower:
                # Definitely keep the pixel opaque
                alpha = 255
            elif brightness >= upper:
                # Definitely make it transparent
                alpha = 0
            else:
                # Smoothly interpolate alpha between thresholds for nicer edges
                # (the closer to 'upper', the more transparent)
                alpha = int(255 - ((brightness - lower) / (upper - lower)) * 255)

            pixels[x, y] = (r, g, b, alpha)

    image.save(output_image_path, "PNG")
    print(f"Transparent image saved to: {output_image_path}")


# Example usage:
if __name__ == "__main__":
    # Update the paths to match your files
    input_image_path = "./assets/date.png"
    output_image_path = "./assets/transparent_image_fixed.png"

    # Tweak lower/upper thresholds to taste
    remove_white_background(input_image_path, output_image_path, lower=180, upper=255)