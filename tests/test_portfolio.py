import pathlib
import re
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent
INDEX_HTML = ROOT / "index.html"
STYLE_CSS = ROOT / "style.css"
SCRIPT_JS = ROOT / "script.js"


class TestPortfolioWebsite(unittest.TestCase):
    def setUp(self):
        self.html = INDEX_HTML.read_text(encoding="utf-8")

    def test_seo_and_opengraph_metadata(self):
        self.assertIn('property="og:title"', self.html)
        self.assertIn('property="og:description"', self.html)
        self.assertIn("Chennai Mathematical Institute", self.html)

    def test_hero_nav_and_contact_consistency(self):
        self.assertIn('href="Bhuvnesh_Sahu_ML_Engineer_CV.pdf"', self.html)
        self.assertIn("M.Sc. Data Science, CMI", self.html)
        self.assertIn("ML Engineer (Meta via Wipro)", self.html)
        self.assertIn("DST INSPIRE Scholar (Top 1%)", self.html)
        self.assertNotIn("bhuvneshsahu1234@gmail.com", self.html)
        self.assertNotIn("9642684363", self.html)
        self.assertNotIn("data-alt-phone", self.html)
        self.assertIn("bhuvnesh.sahu@outlook.com", self.html)
        self.assertIn("+91-9407241555", self.html)

    def test_section_ordering_education_above_repositories(self):
        exp_pos = self.html.find('id="experience"')
        proj_pos = self.html.find('id="projects"')
        edu_pos = self.html.find('id="education"')
        repo_pos = self.html.find('id="repositories"')
        about_pos = self.html.find('id="about"')
        self.assertTrue(
            0 < exp_pos < proj_pos < edu_pos < repo_pos < about_pos,
            "Expected section order: #experience -> #projects -> #education -> #repositories -> #about",
        )

    def test_projects_content_including_tv_series_highlight(self):
        self.assertIn(
            "https://huggingface.co/BhuviBuilds/vericall-qwen2.5-7b-dpo",
            self.html,
        )
        self.assertIn("https://pypi.org/project/traceguard-ai/", self.html)
        self.assertIn("https://github.com/bhuvneshsahu01/TV-Series-analyzer", self.html)
        for token in [
            "86.4%",
            "1.83 GB to 18 MB",
            "6.8 GB",
            "640 ms p50",
            "85 ms p50 TTFT",
            "380 ms uncached",
            "3.0 ms p95",
            "76.7%",
            "1 false positive in 56",
            "71.2%",
            "KuaiRand-1K",
            "0.448",
            "2.1×",
            "6.4%",
            "11.8 ms p95",
            "320 RPS",
            "BART-L-MNLI",
            "Llama-3.1 8B QLoRA",
            "PyVis",
        ]:
            self.assertIn(token, self.html)
        self.assertNotIn("Suicide Rates Analysis", self.html)

    def test_experience_and_education_integrity(self):
        self.assertNotIn("top-$K$", self.html)
        self.assertIn("top-<i>K</i>", self.html)
        for item in [
            "Jul 2025 – Present",
            "Jan 2025 – Apr 2025",
            "May 2024 – Jul 2024",
            "Chennai Mathematical Institute (CMI)",
            "Hindu College, University of Delhi",
            "Bootstrap/Wilson CIs",
        ]:
            self.assertIn(item, self.html)
        about_match = re.search(
            r'<section[^>]*id="about"[^>]*>(.*?)</section>', self.html, re.S
        )
        self.assertIsNotNone(about_match)
        self.assertNotIn("433 queues", about_match.group(1))

    def test_scoped_tabs_clipboard_and_scroll_spy(self):
        js = SCRIPT_JS.read_text(encoding="utf-8")
        self.assertIn("initProofTabs", js)
        self.assertIn("closest('.project-card')", js)
        self.assertIn("navigator.clipboard.writeText", js)
        self.assertIn("initScrollSpy", js)


if __name__ == "__main__":
    unittest.main()
