import os
import matplotlib.pyplot as plt
import matplotlib.patches as patches

os.makedirs('generated_media', exist_ok=True)

# Common styling
plt.rcParams['font.sans-serif'] = 'DejaVu Sans'
plt.rcParams['axes.edgecolor'] = '#CBD5E1'
plt.rcParams['axes.linewidth'] = 0.8

# ==============================================================================
# FIGURE 3.1: USE CASE DIAGRAM (888 x 708)
# ==============================================================================
def make_fig_3_1():
    fig, ax = plt.subplots(figsize=(8.88, 7.08), dpi=100)
    fig.patch.set_facecolor('#FFFFFF')
    ax.set_facecolor('#FFFFFF')
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Title
    ax.text(50, 96, 'Figure 3.1: Use Case Diagram — StudyPilot AI', 
            fontsize=13, fontweight='bold', ha='center', color='#0F172A')
    ax.text(50, 92.5, 'Actor Relationships & Core System Functional Boundaries', 
            fontsize=9.5, ha='center', color='#475569', fontstyle='italic')

    # System boundary box
    sys_box = patches.FancyBboxPatch((24, 6), 52, 83, boxstyle="round,pad=0.5",
                                     fc='#F8FAFC', ec='#2563EB', lw=2)
    ax.add_patch(sys_box)
    ax.text(50, 86, '«System Boundary» StudyPilot AI Ecosystem', 
            fontsize=10.5, fontweight='bold', ha='center', color='#1E40AF')

    # Left Actor: Student
    ax.plot([12], [55], 'o', color='#1E293B', ms=14)
    ax.plot([12, 12], [52, 38], color='#1E293B', lw=3)
    ax.plot([4, 20], [47, 47], color='#1E293B', lw=3)
    ax.plot([12, 5], [38, 25], color='#1E293B', lw=3)
    ax.plot([12, 19], [38, 25], color='#1E293B', lw=3)
    ax.text(12, 20, 'Engineering\nStudent', fontsize=10, fontweight='bold', ha='center', color='#0F172A')

    # Right Actors: YouTube, Firebase, Gemini AI
    yt_box = patches.FancyBboxPatch((80, 70), 16, 12, boxstyle="round,pad=0.3", fc='#EF4444', ec='#B91C1C', lw=1.5)
    ax.add_patch(yt_box)
    ax.text(88, 76, 'YouTube HTML5\nVideo Player', fontsize=8.5, fontweight='bold', ha='center', color='#FFFFFF')

    fb_box = patches.FancyBboxPatch((80, 44), 16, 12, boxstyle="round,pad=0.3", fc='#F59E0B', ec='#D97706', lw=1.5)
    ax.add_patch(fb_box)
    ax.text(88, 50, 'Google Firebase\n(Auth & Firestore)', fontsize=8.5, fontweight='bold', ha='center', color='#FFFFFF')

    ai_box = patches.FancyBboxPatch((80, 18), 16, 12, boxstyle="round,pad=0.3", fc='#3B82F6', ec='#1D4ED8', lw=1.5)
    ax.add_patch(ai_box)
    ax.text(88, 24, 'Google Gemini\nGenerative AI API', fontsize=8.5, fontweight='bold', ha='center', color='#FFFFFF')

    # Use cases inside system
    use_cases = [
        ('UC1: User Authentication & Cloud Sync', 50, 78, '#DBEAFE', '#1D4ED8'),
        ('UC2: YouTube Lecture Telemetry & 90% Filter', 50, 68, '#FEF3C7', '#B45309'),
        ('UC3: Timestamped Lecture Bookmarking', 50, 58, '#DCFCE7', '#15803D'),
        ('UC4: In-Place Syllabus Roadmap Editing', 50, 48, '#E0E7FF', '#4338CA'),
        ('UC5: Dual-Mode AI MCQ Practice Tests', 50, 38, '#FCE7F3', '#BE185D'),
        ('UC6: Question Evaluation & Rationale Review', 50, 28, '#F3E8FF', '#7E22CE'),
        ('UC7: AKTU Credit-Weighted SGPA Estimator', 50, 18, '#CCFBF1', '#0F766E'),
        ('UC8: Sessional Readiness & Streak Analytics', 50, 10, '#FFEDD5', '#C2410C'),
    ]

    for label, x, y, fc, ec in use_cases:
        ellipse = patches.Ellipse((x, y), 38, 6.2, fc=fc, ec=ec, lw=1.2)
        ax.add_patch(ellipse)
        ax.text(x, y, label, fontsize=8, ha='center', va='center', color='#0F172A')

        # Connect Student to use cases
        ax.annotate('', xy=(31, y), xytext=(18, 48),
                    arrowprops=dict(arrowstyle="-", color="#64748B", lw=0.9))

    # Connect to External systems
    ax.annotate('', xy=(80, 76), xytext=(69, 68), arrowprops=dict(arrowstyle="->", color="#DC2626", lw=1.2))
    ax.annotate('', xy=(80, 50), xytext=(69, 78), arrowprops=dict(arrowstyle="->", color="#D97706", lw=1.2))
    ax.annotate('', xy=(80, 50), xytext=(69, 48), arrowprops=dict(arrowstyle="->", color="#D97706", lw=1.2))
    ax.annotate('', xy=(80, 24), xytext=(69, 38), arrowprops=dict(arrowstyle="->", color="#2563EB", lw=1.2))

    plt.tight_layout()
    plt.savefig('generated_media/image2.png', dpi=100)
    plt.close()

# ==============================================================================
# FIGURE 3.2: SYSTEM ARCHITECTURE (350 x 850)
# ==============================================================================
def make_fig_3_2():
    fig, ax = plt.subplots(figsize=(3.5, 8.5), dpi=100)
    fig.patch.set_facecolor('#FFFFFF')
    ax.set_facecolor('#FFFFFF')
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Title
    ax.text(50, 98, 'Figure 3.2: System Architecture', fontsize=11, fontweight='bold', ha='center', color='#0F172A')
    ax.text(50, 95.8, 'StudyPilot 3-Tier Multi-Layer Ecosystem', fontsize=8, ha='center', color='#64748B', fontstyle='italic')

    # Tier 1: Client Sensor Layer
    b1 = patches.FancyBboxPatch((8, 68), 84, 25, boxstyle="round,pad=0.5", fc='#EFF6FF', ec='#3B82F6', lw=1.5)
    ax.add_patch(b1)
    ax.text(50, 90, 'LAYER 1: CLIENT SENSOR LAYER', fontsize=8.5, fontweight='bold', ha='center', color='#1D4ED8')
    ax.text(50, 86.5, 'Google Chrome Extension (Manifest V3)', fontsize=7.5, ha='center', color='#2563EB')

    ax.add_patch(patches.Rectangle((12, 79), 36, 6, fc='#FFFFFF', ec='#93C5FD', lw=1))
    ax.text(30, 82, 'content.js\n(Playback Telemetry)', fontsize=6.5, ha='center', color='#1E293B')

    ax.add_patch(patches.Rectangle((52, 79), 36, 6, fc='#FFFFFF', ec='#93C5FD', lw=1))
    ax.text(70, 82, 'background.js\n(Service Worker)', fontsize=6.5, ha='center', color='#1E293B')

    ax.add_patch(patches.Rectangle((12, 70), 36, 6, fc='#FFFFFF', ec='#93C5FD', lw=1))
    ax.text(30, 73, 'popup.html / popup.js\n(Active Telemetry UI)', fontsize=6.5, ha='center', color='#1E293B')

    ax.add_patch(patches.Rectangle((52, 70), 36, 6, fc='#FFFFFF', ec='#93C5FD', lw=1))
    ax.text(70, 73, 'chrome.storage.local\n(Sensor Session Cache)', fontsize=6.5, ha='center', color='#1E293B')

    # Arrow 1 -> 2
    ax.annotate('', xy=(50, 62), xytext=(50, 67.5), arrowprops=dict(arrowstyle="<->", color="#2563EB", lw=1.5))
    ax.text(50, 64.5, 'bridge.js (Window postMessage API)', fontsize=6.8, ha='center', color='#1E40AF', backgroundcolor='#FFFFFF')

    # Tier 2: Web Platform & Academic Engines
    b2 = patches.FancyBboxPatch((8, 33), 84, 28, boxstyle="round,pad=0.5", fc='#F0FDF4', ec='#22C55E', lw=1.5)
    ax.add_patch(b2)
    ax.text(50, 58, 'LAYER 2: APPLICATION & WEB CLIENT', fontsize=8.5, fontweight='bold', ha='center', color='#15803D')
    ax.text(50, 54.5, 'Modern Vanilla Web App (ES6 Modules & CSS Tokens)', fontsize=7.5, ha='center', color='#16A34A')

    ax.add_patch(patches.Rectangle((12, 45.5), 36, 6.5, fc='#FFFFFF', ec='#86EFAC', lw=1))
    ax.text(30, 48.8, 'Syllabus Roadmap\n(In-Place Tree Engine)', fontsize=6.5, ha='center', color='#1E293B')

    ax.add_patch(patches.Rectangle((52, 45.5), 36, 6.5, fc='#FFFFFF', ec='#86EFAC', lw=1))
    ax.text(70, 48.8, 'AI Practice Test\n(Dual-Mode Engine)', fontsize=6.5, ha='center', color='#1E293B')

    ax.add_patch(patches.Rectangle((12, 36.5), 36, 6.5, fc='#FFFFFF', ec='#86EFAC', lw=1))
    ax.text(30, 39.8, 'AKTU SGPA Estimator\n(Official Formula Engine)', fontsize=6.5, ha='center', color='#1E293B')

    ax.add_patch(patches.Rectangle((52, 36.5), 36, 6.5, fc='#FFFFFF', ec='#86EFAC', lw=1))
    ax.text(70, 39.8, 'Bookmarks & Timestamps\n(Cross-Domain Notes)', fontsize=6.5, ha='center', color='#1E293B')

    # Arrow 2 -> 3
    ax.annotate('', xy=(50, 27), xytext=(50, 32.5), arrowprops=dict(arrowstyle="<->", color="#16A34A", lw=1.5))
    ax.text(50, 29.5, 'HTTPS / REST & WebSockets', fontsize=6.8, ha='center', color='#166534', backgroundcolor='#FFFFFF')

    # Tier 3: Cloud & AI Intelligence Layer
    b3 = patches.FancyBboxPatch((8, 3), 84, 23, boxstyle="round,pad=0.5", fc='#FAF5FF', ec='#A855F7', lw=1.5)
    ax.add_patch(b3)
    ax.text(50, 23, 'LAYER 3: CLOUD BACKEND & AI', fontsize=8.5, fontweight='bold', ha='center', color='#7E22CE')
    ax.text(50, 19.5, 'Serverless Infrastructure & Neural Services', fontsize=7.5, ha='center', color='#9333EA')

    ax.add_patch(patches.Rectangle((12, 11), 36, 6.5, fc='#FFFFFF', ec='#D8B4FE', lw=1))
    ax.text(30, 14.2, 'Firebase Firestore\n(User Collections & Security Rules)', fontsize=6.2, ha='center', color='#1E293B')

    ax.add_patch(patches.Rectangle((52, 11), 36, 6.5, fc='#FFFFFF', ec='#D8B4FE', lw=1))
    ax.text(70, 14.2, 'Google Gemini AI\n(1.5-flash / 2.0 Cascade)', fontsize=6.2, ha='center', color='#1E293B')

    ax.add_patch(patches.Rectangle((32, 4.5), 36, 5, fc='#FFFFFF', ec='#D8B4FE', lw=1))
    ax.text(50, 7, 'Firebase Auth & Token Verification', fontsize=6.2, ha='center', color='#1E293B')

    plt.tight_layout()
    plt.savefig('generated_media/image3.png', dpi=100)
    plt.close()

# ==============================================================================
# FIGURE 4.1: DFD LEVEL-0 (1295 x 180)
# ==============================================================================
def make_fig_4_1():
    fig, ax = plt.subplots(figsize=(12.95, 1.8), dpi=100)
    fig.patch.set_facecolor('#FFFFFF')
    ax.set_facecolor('#FFFFFF')
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 20)
    ax.axis('off')

    # Title
    ax.text(50, 18.5, 'Figure 4.1: Data Flow Diagram (DFD Level-0: Context Diagram)', 
            fontsize=11.5, fontweight='bold', ha='center', color='#0F172A')

    # Entity 1: Student
    e1 = patches.FancyBboxPatch((2, 4), 16, 11, boxstyle="round,pad=0.3", fc='#EFF6FF', ec='#3B82F6', lw=1.5)
    ax.add_patch(e1)
    ax.text(10, 10.5, 'External Entity:\nEngineering Student', fontsize=8.5, fontweight='bold', ha='center', color='#1E40AF')

    # Central Process 0.0
    p0 = patches.Circle((42, 9.5), 8.5, fc='#FEF3C7', ec='#F59E0B', lw=2)
    ax.add_patch(p0)
    ax.text(42, 11.2, 'Process 0.0', fontsize=8, fontweight='bold', ha='center', color='#92400E')
    ax.text(42, 8.5, 'StudyPilot AI\nEcosystem', fontsize=9, fontweight='bold', ha='center', color='#78350F')

    # Entity 2: YouTube
    e2 = patches.FancyBboxPatch((21, 1), 14, 4.5, boxstyle="round,pad=0.2", fc='#FEE2E2', ec='#EF4444', lw=1.2)
    ax.add_patch(e2)
    ax.text(28, 3.2, 'YouTube Video Player', fontsize=7.5, fontweight='bold', ha='center', color='#991B1B')

    # Entity 3: Firebase
    e3 = patches.FancyBboxPatch((64, 4), 15, 11, boxstyle="round,pad=0.3", fc='#FEF9C3', ec='#EAB308', lw=1.5)
    ax.add_patch(e3)
    ax.text(71.5, 10.5, 'External Entity:\nFirebase Cloud\n(Auth & Firestore)', fontsize=8, fontweight='bold', ha='center', color='#854D0E')

    # Entity 4: Gemini AI
    e4 = patches.FancyBboxPatch((83, 4), 15, 11, boxstyle="round,pad=0.3", fc='#F3E8FF', ec='#A855F7', lw=1.5)
    ax.add_patch(e4)
    ax.text(90.5, 10.5, 'External Entity:\nGoogle Gemini AI\nAPI Service', fontsize=8, fontweight='bold', ha='center', color='#6B21A8')

    # Data flows Student <-> StudyPilot
    ax.annotate('', xy=(34, 12), xytext=(18, 12), arrowprops=dict(arrowstyle="->", color="#2563EB", lw=1.2))
    ax.text(26, 13.2, 'Watch Actions, Test Inputs, Grades', fontsize=6.8, ha='center', color='#1E40AF')

    ax.annotate('', xy=(18, 7), xytext=(34, 7), arrowprops=dict(arrowstyle="->", color="#2563EB", lw=1.2))
    ax.text(26, 5.2, 'Progress %, MCQs, SGPA Band', fontsize=6.8, ha='center', color='#1E40AF')

    # YouTube -> StudyPilot
    ax.annotate('', xy=(36, 5), xytext=(28, 5.5), arrowprops=dict(arrowstyle="->", color="#DC2626", lw=1.2))
    ax.text(32, 2.8, 'HTML5 Telemetry', fontsize=6.5, ha='center', color='#B91C1C')

    # StudyPilot <-> Firebase
    ax.annotate('', xy=(64, 11), xytext=(50, 11), arrowprops=dict(arrowstyle="<->", color="#CA8A04", lw=1.2))
    ax.text(57, 12.5, 'Roadmap & Auth Sync', fontsize=6.8, ha='center', color='#854D0E')

    # StudyPilot <-> Gemini
    ax.annotate('', xy=(83, 9.5), xytext=(50, 9.5), arrowprops=dict(arrowstyle="->", color="#9333EA", lw=1.2))
    ax.text(67, 7.5, 'Topic Prompt Cascade -> Schema JSON', fontsize=6.8, ha='center', color='#6B21A8')

    plt.tight_layout()
    plt.savefig('generated_media/image4.png', dpi=100)
    plt.close()

# ==============================================================================
# FIGURE 4.2: DFD LEVEL-1 (982 x 1088)
# ==============================================================================
def make_fig_4_2():
    fig, ax = plt.subplots(figsize=(9.82, 10.88), dpi=100)
    fig.patch.set_facecolor('#FFFFFF')
    ax.set_facecolor('#FFFFFF')
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Title
    ax.text(50, 97.5, 'Figure 4.2: Data Flow Diagram (DFD Level-1: Internal System Workflows)', 
            fontsize=12, fontweight='bold', ha='center', color='#0F172A')

    # External Entities
    ax.add_patch(patches.FancyBboxPatch((4, 82), 20, 11, boxstyle="round,pad=0.3", fc='#EFF6FF', ec='#3B82F6', lw=1.5))
    ax.text(14, 88.5, 'Student / User', fontsize=10, fontweight='bold', ha='center', color='#1E40AF')

    ax.add_patch(patches.FancyBboxPatch((4, 42), 20, 11, boxstyle="round,pad=0.3", fc='#FEE2E2', ec='#EF4444', lw=1.5))
    ax.text(14, 48.5, 'YouTube Player\n(content.js sensor)', fontsize=9.5, fontweight='bold', ha='center', color='#991B1B')

    ax.add_patch(patches.FancyBboxPatch((76, 52), 20, 11, boxstyle="round,pad=0.3", fc='#F3E8FF', ec='#A855F7', lw=1.5))
    ax.text(86, 58.5, 'Google Gemini\nGenerative AI', fontsize=9.5, fontweight='bold', ha='center', color='#6B21A8')

    # Processes 1.0 to 5.0
    processes = [
        ('1.0', 'User Authentication &\nProfile Management', 48, 87, '#DBEAFE', '#2563EB'),
        ('2.0', 'YouTube Playback Telemetry\n& 90% Threshold Filter', 48, 68, '#FEF3C7', '#D97706'),
        ('3.0', 'Syllabus Roadmap &\nTopic Tree Engine', 48, 48, '#DCFCE7', '#16A34A'),
        ('4.0', 'Dual-Mode Practice Test\n& MCQ Assessment', 48, 28, '#FCE7F3', '#DB2777'),
        ('5.0', 'AKTU Credit-Weighted SGPA\n& Readiness Predictor', 48, 9, '#CCFBF1', '#0D9488'),
    ]

    for pno, title, x, y, fc, ec in processes:
        p_circle = patches.FancyBboxPatch((x-15, y-6), 30, 12, boxstyle="round,pad=0.5", fc=fc, ec=ec, lw=1.5)
        ax.add_patch(p_circle)
        ax.text(x, y+2, f'Process {pno}', fontsize=8, fontweight='bold', ha='center', color='#1E293B')
        ax.text(x, y-2, title, fontsize=7.8, ha='center', color='#0F172A')

    # Data Stores
    d1 = patches.Rectangle((75, 78), 22, 9, fc='#F8FAFC', ec='#64748B', lw=1.5)
    ax.add_patch(d1)
    ax.plot([75, 75], [78, 87], color='#0F172A', lw=2)
    ax.text(86, 83.5, 'D1: Local Session Cache\n(chrome.storage.local)', fontsize=7.5, fontweight='bold', ha='center', color='#334155')

    d2 = patches.Rectangle((75, 18), 22, 9, fc='#F8FAFC', ec='#64748B', lw=1.5)
    ax.add_patch(d2)
    ax.plot([75, 75], [18, 27], color='#0F172A', lw=2)
    ax.text(86, 23.5, 'D2: Cloud Firestore DB\n(users/roadmaps/tests)', fontsize=7.5, fontweight='bold', ha='center', color='#334155')

    # Connecting Arrows
    ax.annotate('', xy=(33, 88), xytext=(24, 88), arrowprops=dict(arrowstyle="->", color="#2563EB", lw=1.2))
    ax.text(28.5, 90, 'Credentials', fontsize=7, ha='center', color='#1E40AF')

    ax.annotate('', xy=(48, 74), xytext=(48, 81), arrowprops=dict(arrowstyle="->", color="#64748B", lw=1.2))

    ax.annotate('', xy=(33, 68), xytext=(24, 49), arrowprops=dict(arrowstyle="->", color="#EF4444", lw=1.2))
    ax.text(27, 60, 'currentTime delta', fontsize=7, ha='center', color='#B91C1C')

    ax.annotate('', xy=(48, 54), xytext=(48, 62), arrowprops=dict(arrowstyle="->", color="#D97706", lw=1.2))
    ax.text(53, 58, '90% Complete trigger', fontsize=7, color='#B45309')

    ax.annotate('', xy=(48, 34), xytext=(48, 42), arrowprops=dict(arrowstyle="->", color="#16A34A", lw=1.2))
    ax.text(53, 38, 'Topic IDs & Coverage %', fontsize=7, color='#15803D')

    ax.annotate('', xy=(48, 15), xytext=(48, 22), arrowprops=dict(arrowstyle="->", color="#DB2777", lw=1.2))
    ax.text(53, 18.5, 'Test Scores & Analytics', fontsize=7, color='#9D174D')

    # Connect to D1 & D2
    ax.annotate('', xy=(75, 72), xytext=(63, 68), arrowprops=dict(arrowstyle="<->", color="#64748B", lw=1.2))
    ax.annotate('', xy=(75, 25), xytext=(63, 48), arrowprops=dict(arrowstyle="<->", color="#059669", lw=1.2))
    ax.annotate('', xy=(75, 23), xytext=(63, 28), arrowprops=dict(arrowstyle="<->", color="#059669", lw=1.2))

    # Connect Process 4.0 to Gemini
    ax.annotate('', xy=(76, 56), xytext=(63, 33), arrowprops=dict(arrowstyle="<->", color="#7C3AED", lw=1.2))
    ax.text(71, 44, 'Structured MCQ Schema', fontsize=7, ha='center', color='#6D28D9')

    plt.tight_layout()
    plt.savefig('generated_media/image5.png', dpi=100)
    plt.close()

# ==============================================================================
# FIGURE 5.1: FLOWCHART (465 x 787)
# ==============================================================================
def make_fig_5_1():
    fig, ax = plt.subplots(figsize=(4.65, 7.87), dpi=100)
    fig.patch.set_facecolor('#FFFFFF')
    ax.set_facecolor('#FFFFFF')
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Title
    ax.text(50, 98, 'Figure 5.1: Telemetry Flowchart', fontsize=10.5, fontweight='bold', ha='center', color='#0F172A')
    ax.text(50, 95.5, '90% Watch Threshold & Anti-Cheat Logic', fontsize=7.5, ha='center', color='#64748B', fontstyle='italic')

    # Start
    ax.add_patch(patches.FancyBboxPatch((35, 89), 30, 4.5, boxstyle="round,pad=0.4", fc='#10B981', ec='#047857', lw=1.2))
    ax.text(50, 91.2, 'Start (YouTube Tab Loaded)', fontsize=7, fontweight='bold', ha='center', color='#FFFFFF')

    # Step 1: Detect video element
    ax.add_patch(patches.Rectangle((20, 80), 60, 5.5, fc='#F1F5F9', ec='#94A3B8', lw=1.2))
    ax.text(50, 82.8, 'Query HTML5 <video> Element\nExtract Total Duration (D)', fontsize=6.8, ha='center', color='#0F172A')

    # Step 2: Set Timer Interval
    ax.add_patch(patches.Rectangle((20, 71), 60, 5.5, fc='#F1F5F9', ec='#94A3B8', lw=1.2))
    ax.text(50, 73.8, 'Set Telemetry Interval (2.5s)\nSample currentTime (T_curr)', fontsize=6.8, ha='center', color='#0F172A')

    # Decision 1: Is Playing?
    d1 = patches.Polygon([[50, 68], [68, 64], [50, 60], [32, 64]], fc='#FEF3C7', ec='#F59E0B', lw=1.2)
    ax.add_patch(d1)
    ax.text(50, 64, 'Is Video\nPlaying?', fontsize=6.5, fontweight='bold', ha='center', va='center', color='#92400E')

    # Decision 2: Did user skip forward? (Delta > 20s)
    d2 = patches.Polygon([[50, 55], [72, 50], [50, 45], [28, 50]], fc='#FEE2E2', ec='#EF4444', lw=1.2)
    ax.add_patch(d2)
    ax.text(50, 50, 'Did User Skip?\n(ΔT > 20s or < 0)', fontsize=6.5, fontweight='bold', ha='center', va='center', color='#991B1B')

    # Reject skip
    ax.add_patch(patches.Rectangle((75, 47.5), 22, 5, fc='#FEE2E2', ec='#EF4444', lw=1))
    ax.text(86, 50, 'Discard ΔT\nReset Anchor', fontsize=6, ha='center', va='center', color='#7F1D1D')

    # Accumulate valid time
    ax.add_patch(patches.Rectangle((20, 36), 60, 5.5, fc='#DCFCE7', ec='#22C55E', lw=1.2))
    ax.text(50, 38.8, 'Accumulate Watched Seconds:\nW_accum = W_accum + ΔT', fontsize=6.8, fontweight='bold', ha='center', color='#14532D')

    # Calculate ratio
    ax.add_patch(patches.Rectangle((20, 27.5), 60, 5.5, fc='#F1F5F9', ec='#94A3B8', lw=1.2))
    ax.text(50, 30.2, 'Compute Ratio: R = W_accum / D\nUpdate Extension Popup Progress Bar', fontsize=6.8, ha='center', color='#0F172A')

    # Decision 3: R >= 0.90?
    d3 = patches.Polygon([[50, 24.5], [70, 20], [50, 15.5], [30, 20]], fc='#DBEAFE', ec='#3B82F6', lw=1.2)
    ax.add_patch(d3)
    ax.text(50, 20, 'Watch Ratio\nR ≥ 90%?', fontsize=6.5, fontweight='bold', ha='center', va='center', color='#1E40AF')

    # Mark Complete
    ax.add_patch(patches.Rectangle((20, 7), 60, 5.5, fc='#3B82F6', ec='#1D4ED8', lw=1.2))
    ax.text(50, 9.8, 'Trigger Completion Event via bridge.js\nMark Topic "COMPLETED" in Firestore', fontsize=6.8, fontweight='bold', ha='center', color='#FFFFFF')

    # Arrows
    ax.annotate('', xy=(50, 85.5), xytext=(50, 89), arrowprops=dict(arrowstyle="->", color="#475569"))
    ax.annotate('', xy=(50, 76.5), xytext=(50, 80), arrowprops=dict(arrowstyle="->", color="#475569"))
    ax.annotate('', xy=(50, 68), xytext=(50, 71), arrowprops=dict(arrowstyle="->", color="#475569"))

    # Is playing No -> loop
    ax.plot([32, 16, 16, 20], [64, 64, 73.8, 73.8], color="#D97706", lw=1)
    ax.text(24, 66, 'No (Wait)', fontsize=6, color='#B45309')

    # Is playing Yes -> d2
    ax.annotate('', xy=(50, 55), xytext=(50, 60), arrowprops=dict(arrowstyle="->", color="#047857"))
    ax.text(52, 57.5, 'Yes', fontsize=6, color='#047857')

    # Skip Yes -> reject
    ax.annotate('', xy=(75, 50), xytext=(72, 50), arrowprops=dict(arrowstyle="->", color="#EF4444"))
    ax.text(73.5, 51.5, 'Yes', fontsize=6, color='#DC2626')

    # Skip No -> accumulate
    ax.annotate('', xy=(50, 41.5), xytext=(50, 45), arrowprops=dict(arrowstyle="->", color="#047857"))
    ax.text(52, 43.5, 'No', fontsize=6, color='#047857')

    ax.annotate('', xy=(50, 33), xytext=(50, 36), arrowprops=dict(arrowstyle="->", color="#475569"))
    ax.annotate('', xy=(50, 24.5), xytext=(50, 27.5), arrowprops=dict(arrowstyle="->", color="#475569"))

    # R >= 90% Yes -> mark complete
    ax.annotate('', xy=(50, 12.5), xytext=(50, 15.5), arrowprops=dict(arrowstyle="->", color="#1D4ED8"))
    ax.text(52, 14, 'Yes', fontsize=6, color='#1D4ED8')

    # R >= 90% No -> loop back
    ax.plot([30, 14, 14, 20], [20, 20, 73.8, 73.8], color="#64748B", lw=1)
    ax.text(10, 45, 'No (Keep Watching)', fontsize=6, color='#64748B', rotation=90)

    # End
    ax.add_patch(patches.FancyBboxPatch((35, 1), 30, 4, boxstyle="round,pad=0.3", fc='#64748B', ec='#334155', lw=1.2))
    ax.text(50, 3, 'Stop Monitoring / Session Done', fontsize=6.5, fontweight='bold', ha='center', color='#FFFFFF')
    ax.annotate('', xy=(50, 5), xytext=(50, 7), arrowprops=dict(arrowstyle="->", color="#475569"))

    plt.tight_layout()
    plt.savefig('generated_media/image6.png', dpi=100)
    plt.close()

# ==============================================================================
# FIGURE B.1.1: HOME PAGE / DASHBOARD (1266 x 650)
# ==============================================================================
def make_fig_b_1_1():
    fig, ax = plt.subplots(figsize=(12.66, 6.50), dpi=100)
    fig.patch.set_facecolor('#0F172A')
    ax.set_facecolor('#0F172A')
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # App Header / Navbar
    ax.add_patch(patches.Rectangle((0, 90), 100, 10, fc='#1E293B', ec='#334155', lw=1))
    ax.text(3, 95, ' StudyPilot AI', fontsize=14, fontweight='bold', color='#38BDF8', va='center')
    ax.text(22, 95, 'Dashboard', fontsize=10, fontweight='bold', color='#F8FAFC', va='center')
    ax.text(32, 95, 'Syllabus Roadmap', fontsize=10, color='#94A3B8', va='center')
    ax.text(46, 95, 'AI Practice Tests', fontsize=10, color='#94A3B8', va='center')
    ax.text(58, 95, 'SGPA Estimator', fontsize=10, color='#94A3B8', va='center')
    ax.text(70, 95, 'Bookmarks', fontsize=10, color='#94A3B8', va='center')

    # User Profile Pill
    ax.add_patch(patches.FancyBboxPatch((81, 92), 17, 6, boxstyle="round,pad=0.3", fc='#0F172A', ec='#38BDF8', lw=1))
    ax.text(89.5, 95, ' Deepak Pandey (AKTU)', fontsize=8, color='#E2E8F0', ha='center', va='center')

    # Greeting Banner
    ax.text(4, 84, 'Welcome back, Deepak! ', fontsize=18, fontweight='bold', color='#F8FAFC')
    ax.text(4, 79.5, 'Active Domain: AKTU B.Tech CSE (4th Semester) • Cloud Sync: Connected (Firestore)', fontsize=10, color='#38BDF8')

    # 4 Stat Cards
    cards = [
        ('Active Study Streak', '14 Days ', 'Consistent Daily Revision', 4, '#1E293B', '#F59E0B'),
        ('Total Study Time', '46.5 Hours ', '+4.2 hrs recorded this week', 28, '#1E293B', '#38BDF8'),
        ('Syllabus Completion', '72.4% ', '38 of 52 Topics Completed', 52, '#1E293B', '#10B981'),
        ('Average Test Score', '86.8% ', '8 AI Practice Tests Taken', 76, '#1E293B', '#A855F7')
    ]

    for title, val, sub, x, fc, accent in cards:
        ax.add_patch(patches.FancyBboxPatch((x, 56), 20, 18, boxstyle="round,pad=0.5", fc=fc, ec=accent, lw=1.5))
        ax.text(x+2, 70, title, fontsize=8.5, color='#94A3B8')
        ax.text(x+2, 63.5, val, fontsize=13, fontweight='bold', color='#F8FAFC')
        ax.text(x+2, 58.5, sub, fontsize=7.2, color='#CBD5E1')

    # Quick Actions Panel (Left)
    ax.add_patch(patches.FancyBboxPatch((4, 8), 44, 43, boxstyle="round,pad=0.5", fc='#1E293B', ec='#334155', lw=1))
    ax.text(6, 47, ' Quick Actions & Active Tasks', fontsize=12, fontweight='bold', color='#F8FAFC')

    actions = [
        (' Continue: Operating Systems - Unit 2 (Process Scheduling)', '42 mins remaining • 65% watched', 38),
        (' Take AI Practice Test: Theory of Automata (Unit 3: CFG)', '10 Questions • Gemini 1.5 Flash', 28),
        (' Estimate Sessional & Semester SGPA Target', 'Credit Weighted • Grade Predictor', 18),
    ]
    for act_title, act_sub, y in actions:
        ax.add_patch(patches.FancyBboxPatch((6, y-3), 40, 7.5, boxstyle="round,pad=0.3", fc='#0F172A', ec='#475569', lw=0.8))
        ax.text(7.5, y+2, act_title, fontsize=8.2, fontweight='bold', color='#38BDF8')
        ax.text(7.5, y-1.5, act_sub, fontsize=7.2, color='#94A3B8')

    # Recent Video Telemetry Activity (Right)
    ax.add_patch(patches.FancyBboxPatch((52, 8), 44, 43, boxstyle="round,pad=0.5", fc='#1E293B', ec='#334155', lw=1))
    ax.text(54, 47, ' Recent Lecture Telemetry & Bookmarks', fontsize=12, fontweight='bold', color='#F8FAFC')

    telemetry = [
        ('YouTube: Gate Smashers - Round Robin Scheduling', '34:10 / 38:00 (90% Completed )', 'Today, 10:45 PM', 38, '#10B981'),
        ('YouTube: Neso Academy - Chomsky Normal Form Proof', '18:25 / 45:10 (In Progress - 41%)', 'Yesterday, 8:20 PM', 28, '#F59E0B'),
        ('Bookmark: Memory Management Paging Formula (14:22)', 'Notes: "TLB Hit ratio formula for numericals"', 'Yesterday, 4:15 PM', 18, '#38BDF8'),
    ]
    for tel_title, tel_sub, tel_time, y, dot_color in telemetry:
        ax.add_patch(patches.FancyBboxPatch((54, y-3), 40, 7.5, boxstyle="round,pad=0.3", fc='#0F172A', ec='#475569', lw=0.8))
        ax.plot([56], [y+1.5], 'o', color=dot_color, ms=7)
        ax.text(58, y+2, tel_title, fontsize=8, fontweight='bold', color='#F8FAFC')
        ax.text(58, y-1.5, f'{tel_sub} • {tel_time}', fontsize=6.8, color='#94A3B8')

    plt.tight_layout()
    plt.savefig('generated_media/image7.png', dpi=100)
    plt.close()

# ==============================================================================
# FIGURE B.2.1: SYLLABUS ROADMAP INTERFACE (1355 x 696)
# ==============================================================================
def make_fig_b_2_1():
    fig, ax = plt.subplots(figsize=(13.55, 6.96), dpi=100)
    fig.patch.set_facecolor('#0F172A')
    ax.set_facecolor('#0F172A')
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Header
    ax.add_patch(patches.Rectangle((0, 91), 100, 9, fc='#1E293B', ec='#334155', lw=1))
    ax.text(3, 95.5, ' StudyPilot AI > Syllabus Roadmap', fontsize=13, fontweight='bold', color='#38BDF8', va='center')
    ax.text(45, 95.5, 'Domain: AKTU B.Tech CSE (4th Sem)', fontsize=9.5, color='#F8FAFC', va='center')
    ax.text(82, 95.5, 'Progress: 72.4% (38/52 Units)', fontsize=9.5, fontweight='bold', color='#10B981', va='center')

    # Subject Selector Tabs
    subjects = [
        ('Operating Systems (KCS-401)', 3, 30, True),
        ('Theory of Automata (KCS-402)', 35, 30, False),
        ('Microprocessor (KCS-403)', 67, 30, False),
    ]
    for s_name, sx, sw, active in subjects:
        fc = '#2563EB' if active else '#1E293B'
        tc = '#FFFFFF' if active else '#94A3B8'
        ax.add_patch(patches.FancyBboxPatch((sx, 83), sw, 6, boxstyle="round,pad=0.3", fc=fc, ec='#3B82F6', lw=1))
        ax.text(sx + sw/2, 86, s_name, fontsize=8.8, fontweight='bold', color=tc, ha='center', va='center')

    # Unit 1
    ax.add_patch(patches.FancyBboxPatch((3, 67), 94, 13.5, boxstyle="round,pad=0.4", fc='#1E293B', ec='#10B981', lw=1.2))
    ax.text(5, 76.5, ' Unit 1: Introduction to Operating Systems & System Calls', fontsize=10.5, fontweight='bold', color='#F8FAFC')
    ax.text(85, 76.5, '100% Completed ', fontsize=9, fontweight='bold', color='#10B981')
    ax.text(7, 72, '• OS Functions, Monolithic vs Microkernel, System Call Lifecycle (fork, exec, wait, exit)', fontsize=8, color='#CBD5E1')
    ax.text(7, 68.5, 'Attached Lectures: 4 Videos • Watched: 2h 15m • Timestamped Notes: 6 captured', fontsize=7.2, color='#38BDF8')

    # Unit 2 (Expanded / In-Progress)
    ax.add_patch(patches.FancyBboxPatch((3, 33), 94, 31.5, boxstyle="round,pad=0.4", fc='#1E293B', ec='#38BDF8', lw=1.5))
    ax.text(5, 60.5, ' Unit 2: Process Management, Threads & CPU Scheduling Algorithms', fontsize=11, fontweight='bold', color='#38BDF8')
    ax.text(84, 60.5, '65% In-Progress ', fontsize=9, fontweight='bold', color='#F59E0B')

    # Topic Sub-rows in Unit 2
    topics = [
        (' Process Concept, States & PCB Structures', 'Gate Smashers Video #4', '22 mins', 'Completed (94% watched)', '#10B981', 54),
        (' FCFS & SJF (Preemptive & Non-Preemptive) Scheduling', 'Neso Academy Video #8', '35 mins', 'Completed (91% watched)', '#10B981', 47),
        (' Round Robin & Multi-Level Feedback Queue Scheduling', 'Gate Smashers Video #11', '40 mins', 'In-Progress (65% watched)', '#F59E0B', 40),
        (' Inter-Process Communication & Critical Section Problem', 'Knowledge Gate Video #14', '30 mins', 'Pending (Not started)', '#94A3B8', 34),
    ]

    for t_name, t_src, t_dur, t_stat, t_col, ty in topics:
        ax.add_patch(patches.FancyBboxPatch((5, ty-1.5), 90, 5.5, boxstyle="round,pad=0.2", fc='#0F172A', ec='#334155', lw=0.8))
        ax.text(7, ty+1.2, t_name, fontsize=8, fontweight='bold', color='#F8FAFC')
        ax.text(55, ty+1.2, f'Source: {t_src} ({t_dur})', fontsize=7.2, color='#94A3B8')
        ax.text(83, ty+1.2, t_stat, fontsize=7.2, fontweight='bold', color=t_col)

    # Unit 3
    ax.add_patch(patches.FancyBboxPatch((3, 17), 94, 13.5, boxstyle="round,pad=0.4", fc='#1E293B', ec='#64748B', lw=1))
    ax.text(5, 26.5, ' Unit 3: Deadlocks, Prevention, Avoidance (Banker\'s Algorithm)', fontsize=10.5, fontweight='bold', color='#E2E8F0')
    ax.text(86, 26.5, '40% In-Progress', fontsize=9, color='#F59E0B')
    ax.text(7, 21.5, '• Deadlock Characterization (4 Conditions), Resource Allocation Graphs, Banker\'s Algorithm', fontsize=8, color='#94A3B8')

    # Unit 4 & 5
    ax.add_patch(patches.FancyBboxPatch((3, 2), 94, 12.5, boxstyle="round,pad=0.4", fc='#1E293B', ec='#334155', lw=1))
    ax.text(5, 10.5, ' Unit 4 & Unit 5: Memory Management (Paging, TLB) & File Systems', fontsize=10.5, fontweight='bold', color='#94A3B8')
    ax.text(88, 10.5, 'Pending (0%)', fontsize=9, color='#64748B')
    ax.text(7, 5.5, '• Virtual Memory, Demand Paging, Page Replacement (FIFO, LRU, Optimal), Disk Scheduling', fontsize=8, color='#64748B')

    plt.tight_layout()
    plt.savefig('generated_media/image8.png', dpi=100)
    plt.close()

# ==============================================================================
# FIGURE B.2.2: CHROME EXTENSION POPUP (1382 x 662)
# ==============================================================================
def make_fig_b_2_2():
    fig, ax = plt.subplots(figsize=(13.82, 6.62), dpi=100)
    fig.patch.set_facecolor('#0B0F19')
    ax.set_facecolor('#0B0F19')
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Left: YouTube Watch Page Context
    yt_win = patches.FancyBboxPatch((2, 5), 60, 90, boxstyle="round,pad=0.5", fc='#0F172A', ec='#334155', lw=1.5)
    ax.add_patch(yt_win)
    ax.text(4, 91.5, ' YouTube — Gate Smashers: Round Robin CPU Scheduling (AKTU CSE)', fontsize=10, fontweight='bold', color='#F8FAFC')

    # Simulated Video Screen
    ax.add_patch(patches.Rectangle((4, 38), 56, 49, fc='#000000', ec='#1E293B', lw=1))
    ax.text(32, 65, ' [HTML5 Video Player: Gate Smashers]', fontsize=11, color='#64748B', ha='center')
    ax.text(32, 58, 'Time: 28:45 / 32:00 • 89.8% Watched', fontsize=10, fontweight='bold', color='#38BDF8', ha='center')

    # Video Player Progress Bar
    ax.add_patch(patches.Rectangle((6, 42), 52, 2.5, fc='#334155'))
    ax.add_patch(patches.Rectangle((6, 42), 46.5, 2.5, fc='#EF4444'))
    ax.text(50, 46, '28:45 / 32:00', fontsize=7.5, color='#CBD5E1')

    # Extension Telemetry Badge overlay on video
    ax.add_patch(patches.FancyBboxPatch((6, 76), 34, 8, boxstyle="round,pad=0.3", fc='#1E293B', ec='#10B981', lw=1))
    ax.text(8, 80, ' StudyPilot Sensor Active: +28m 45s recorded', fontsize=7.5, fontweight='bold', color='#10B981')

    # YouTube details below video
    ax.text(4, 32, 'Operating Systems: CPU Scheduling - Round Robin with Gantt Chart Examples', fontsize=9.5, fontweight='bold', color='#F8FAFC')
    ax.text(4, 27, 'Gate Smashers • 420K views • AKTU Unit 2 Syllabus Match 100%', fontsize=8, color='#94A3B8')
    ax.text(4, 21, 'content.js: Periodic polling every 2.5s | Seek detector: Normal playback delta | 90% Threshold: Active', fontsize=7.2, color='#38BDF8')

    # Right: Chrome Extension Manifest V3 Popup
    ext_box = patches.FancyBboxPatch((65, 5), 33, 90, boxstyle="round,pad=0.5", fc='#1E293B', ec='#38BDF8', lw=2)
    ax.add_patch(ext_box)

    # Popup Header
    ax.add_patch(patches.Rectangle((65, 87), 33, 8, fc='#0F172A'))
    ax.text(67, 91, ' StudyPilot AI', fontsize=12, fontweight='bold', color='#38BDF8')
    ax.text(94, 91, 'v1.0.2', fontsize=8, color='#94A3B8')

    # Domain Selector
    ax.add_patch(patches.FancyBboxPatch((67, 78), 29, 6.5, boxstyle="round,pad=0.2", fc='#0F172A', ec='#475569', lw=0.8))
    ax.text(68.5, 81.2, 'Active Domain: AKTU B.Tech CSE ', fontsize=7.8, fontweight='bold', color='#E2E8F0')

    # Video Telemetry Card
    ax.add_patch(patches.FancyBboxPatch((67, 49), 29, 26, boxstyle="round,pad=0.3", fc='#0F172A', ec='#38BDF8', lw=1))
    ax.text(68.5, 71, 'VIDEO TELEMETRY SENSOR', fontsize=7.5, fontweight='bold', color='#38BDF8')
    ax.text(68.5, 66.5, 'Gate Smashers: Round Robin', fontsize=8.2, fontweight='bold', color='#F8FAFC')
    ax.text(68.5, 62.5, 'Watched: 28m 45s (89.8%)', fontsize=8, color='#10B981')

    # 90% Progress Bar inside Extension
    ax.add_patch(patches.Rectangle((68.5, 56), 26, 3, fc='#334155'))
    ax.add_patch(patches.Rectangle((68.5, 56), 23.3, 3, fc='#10B981'))
    ax.text(81.5, 52, '90% Target: 28m 48s (Almost Complete!)', fontsize=6.8, ha='center', color='#CBD5E1')

    # Bookmark Button
    ax.add_patch(patches.FancyBboxPatch((67, 37), 29, 9, boxstyle="round,pad=0.3", fc='#2563EB', ec='#1D4ED8', lw=1))
    ax.text(81.5, 41.5, ' Bookmark Timestamp (28:45)', fontsize=8.5, fontweight='bold', color='#FFFFFF', ha='center', va='center')

    # Cloud Sync Card
    ax.add_patch(patches.FancyBboxPatch((67, 21), 29, 13, boxstyle="round,pad=0.3", fc='#0F172A', ec='#475569', lw=0.8))
    ax.text(68.5, 30.5, 'CLOUD STATUS & SYNC', fontsize=7.5, fontweight='bold', color='#94A3B8')
    ax.text(68.5, 26, ' Firebase Auth: Deepak Pandey', fontsize=7.2, color='#10B981')
    ax.text(68.5, 22.5, ' Cross-Origin Bridge: Connected', fontsize=7.2, color='#10B981')

    # Open Dashboard Button
    ax.add_patch(patches.FancyBboxPatch((67, 8), 29, 9, boxstyle="round,pad=0.3", fc='#0F172A', ec='#38BDF8', lw=1))
    ax.text(81.5, 12.5, ' Open Web Dashboard ↗', fontsize=8.5, fontweight='bold', color='#38BDF8', ha='center', va='center')

    plt.tight_layout()
    plt.savefig('generated_media/image9.png', dpi=100)
    plt.close()

# ==============================================================================
# FIGURE B.3.1: AI PRACTICE TEST ENGINE (1266 x 599)
# ==============================================================================
def make_fig_b_3_1():
    fig, ax = plt.subplots(figsize=(12.66, 5.99), dpi=100)
    fig.patch.set_facecolor('#0F172A')
    ax.set_facecolor('#0F172A')
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Header
    ax.add_patch(patches.Rectangle((0, 91), 100, 9, fc='#1E293B', ec='#334155', lw=1))
    ax.text(3, 95.5, ' StudyPilot AI > Dual-Mode AI Practice Test Engine', fontsize=12.5, fontweight='bold', color='#38BDF8', va='center')
    ax.text(62, 95.5, 'AI Engine: Google Gemini 1.5 Flash (Schema JSON)', fontsize=8.5, color='#A855F7', va='center')
    ax.text(90, 95.5, ' Time: 11:24', fontsize=9.5, fontweight='bold', color='#F59E0B', va='center')

    # Test Meta Info Strip
    ax.add_patch(patches.Rectangle((3, 83), 94, 6, fc='#1E293B', ec='#475569', lw=0.8))
    ax.text(5, 86, 'Subject: Operating Systems (KCS-401) • Unit 2: Process Management & CPU Scheduling • Question 4 of 10', fontsize=8.5, color='#F8FAFC', va='center')
    ax.text(85, 86, 'Mode: Progress-Based Test', fontsize=8, fontweight='bold', color='#10B981', va='center')

    # Question Box
    ax.add_patch(patches.FancyBboxPatch((3, 56), 94, 24, boxstyle="round,pad=0.4", fc='#1E293B', ec='#38BDF8', lw=1.2))
    ax.text(5, 74, 'Question 4:', fontsize=10.5, fontweight='bold', color='#38BDF8')
    q_txt = ('Consider three processes P1, P2, and P3 arriving at time 0 with CPU burst times of 24ms, 3ms, and 3ms respectively.\n'
             'If the Round Robin (RR) scheduling algorithm is used with a time quantum of 4ms, what is the average waiting time for the processes?')
    ax.text(5, 68, q_txt, fontsize=8.8, color='#F8FAFC', va='top')

    # Options A, B, C, D
    options = [
        ('A', '5.66 ms', 5, 45, False, False),
        ('B', '6.00 ms (Selected Answer)', 52, 45, True, False),
        ('C', '4.33 ms', 5, 34, False, False),
        ('D', '7.25 ms', 52, 34, False, False),
    ]

    for opt_letter, opt_text, ox, oy, is_selected, is_correct in options:
        fc = '#1E3A8A' if is_selected else '#0F172A'
        ec = '#38BDF8' if is_selected else '#334155'
        tc = '#FFFFFF' if is_selected else '#CBD5E1'
        ax.add_patch(patches.FancyBboxPatch((ox, oy), 45, 8.5, boxstyle="round,pad=0.3", fc=fc, ec=ec, lw=1.2))
        ax.text(ox+2, oy+4.2, f'[{opt_letter}]  {opt_text}', fontsize=8.5, fontweight='bold', color=tc, va='center')

    # AI Evaluation & Rationale Box (Instant Feedback)
    ax.add_patch(patches.FancyBboxPatch((3, 7), 94, 23, boxstyle="round,pad=0.4", fc='#064E3B', ec='#10B981', lw=1.5))
    ax.text(5, 25.5, ' Correct! Gemini AI Evaluation & Concept Rationale:', fontsize=9.5, fontweight='bold', color='#34D399')
    rationale = (
        '• Gantt Chart: P1 [0-4] -> P2 [4-7] (P2 finishes) -> P3 [7-10] (P3 finishes) -> P1 [10-30] (P1 finishes at t=30).\n'
        '• Waiting Times: P1 waits (4-4) + (10-4) = 6ms | P2 waits 4ms | P3 waits 7ms.\n'
        '• Average Waiting Time = (6 + 4 + 7) / 3 = 17 / 3 = 5.66 ms. (Note: Formula verified against official AKTU syllabus unit 2).'
    )
    ax.text(5, 20.5, rationale, fontsize=8, color='#ECFDF5', va='top')

    # Action Buttons
    ax.add_patch(patches.FancyBboxPatch((78, 1), 19, 5, boxstyle="round,pad=0.3", fc='#2563EB', ec='#1D4ED8', lw=1))
    ax.text(87.5, 3.5, 'Next Question →', fontsize=8.5, fontweight='bold', color='#FFFFFF', ha='center', va='center')

    plt.tight_layout()
    plt.savefig('generated_media/image10.png', dpi=100)
    plt.close()

# ==============================================================================
# FIGURE B.3.2: SGPA ESTIMATOR & ANALYTICS (1266 x 677)
# ==============================================================================
def make_fig_b_3_2():
    fig, ax = plt.subplots(figsize=(12.66, 6.77), dpi=100)
    fig.patch.set_facecolor('#0F172A')
    ax.set_facecolor('#0F172A')
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Header
    ax.add_patch(patches.Rectangle((0, 91), 100, 9, fc='#1E293B', ec='#334155', lw=1))
    ax.text(3, 95.5, ' StudyPilot AI > Dual-Mode SGPA Estimator & Readiness Predictor', fontsize=12.5, fontweight='bold', color='#38BDF8', va='center')
    ax.text(80, 95.5, 'Formula: Official AKTU Ordinance', fontsize=8.5, color='#94A3B8', va='center')

    # Top Metric Banner
    ax.add_patch(patches.FancyBboxPatch((3, 68), 30, 20, boxstyle="round,pad=0.5", fc='#1E293B', ec='#10B981', lw=2))
    ax.text(18, 83, 'CALCULATED AKTU SGPA', fontsize=8.5, fontweight='bold', color='#94A3B8', ha='center')
    ax.text(18, 76, '8.72', fontsize=26, fontweight='bold', color='#10B981', ha='center')
    ax.text(18, 71, 'Total Credits: 21 • Grade Points: 183', fontsize=7.8, color='#CBD5E1', ha='center')

    # Readiness Predictor Box
    ax.add_patch(patches.FancyBboxPatch((35, 68), 62, 20, boxstyle="round,pad=0.5", fc='#1E293B', ec='#38BDF8', lw=1.5))
    ax.text(38, 84, 'Mode B: Sessional Readiness & Exam Band Predictor', fontsize=10, fontweight='bold', color='#38BDF8')
    ax.text(38, 79.5, 'Synthesizes: 72.4% Syllabus Coverage + 86.8% Average Test Score + 46.5 Study Hours', fontsize=8, color='#E2E8F0')
    ax.text(38, 74.5, 'Expected University Exam SGPA Band:  8.50 — 9.00 (First Division with Distinction)', fontsize=8.8, fontweight='bold', color='#F59E0B')
    ax.text(38, 70.5, 'High Priority Revision: Theory of Automata (Unit 4: Turing Machines - 28% covered)', fontsize=7.8, color='#F87171')

    # Course Table (Left)
    ax.add_patch(patches.FancyBboxPatch((3, 7), 58, 58, boxstyle="round,pad=0.4", fc='#1E293B', ec='#334155', lw=1))
    ax.text(5, 61, ' Semester 4 (CSE) Subject Credit Breakdown', fontsize=10.5, fontweight='bold', color='#F8FAFC')

    # Table Header
    ax.add_patch(patches.Rectangle((5, 54), 54, 4.5, fc='#0F172A'))
    ax.text(6, 56.2, 'Code', fontsize=7.5, fontweight='bold', color='#94A3B8')
    ax.text(17, 56.2, 'Course Name', fontsize=7.5, fontweight='bold', color='#94A3B8')
    ax.text(38, 56.2, 'Credits', fontsize=7.5, fontweight='bold', color='#94A3B8')
    ax.text(45, 56.2, 'Grade', fontsize=7.5, fontweight='bold', color='#94A3B8')
    ax.text(53, 56.2, 'Points', fontsize=7.5, fontweight='bold', color='#94A3B8')

    table_rows = [
        ('KCS-401', 'Operating Systems', '4', 'A+ (9)', '36', 48),
        ('KCS-402', 'Theory of Automata & Formal Lang.', '4', 'A (8)', '32', 42),
        ('KCS-403', 'Microprocessor & Microcontrollers', '3', 'B+ (7)', '21', 36),
        ('KVE-401', 'Universal Human Values', '3', 'A+ (9)', '27', 30),
        ('KAS-402', 'Maths IV (PDE & Probability)', '4', 'O (10)', '40', 24),
        ('KCS-451', 'Operating Systems Lab', '1', 'O (10)', '10', 18),
        ('KCS-452', 'Microprocessor Lab', '1', 'A+ (9)', '9', 12),
    ]

    for ccode, cname, ccred, cgrd, cpts, ry in table_rows:
        ax.plot([5, 59], [ry-1, ry-1], color='#334155', lw=0.6)
        ax.text(6, ry+1, ccode, fontsize=7.2, color='#38BDF8')
        ax.text(17, ry+1, cname[:24], fontsize=7.2, color='#F8FAFC')
        ax.text(40, ry+1, ccred, fontsize=7.2, color='#CBD5E1')
        ax.text(46, ry+1, cgrd, fontsize=7.2, fontweight='bold', color='#10B981')
        ax.text(54, ry+1, cpts, fontsize=7.2, color='#CBD5E1')

    # Study Analytics Graph (Right)
    ax.add_patch(patches.FancyBboxPatch((64, 7), 33, 58, boxstyle="round,pad=0.4", fc='#1E293B', ec='#334155', lw=1))
    ax.text(66, 61, ' Weekly Study Hours & Streak', fontsize=10.5, fontweight='bold', color='#F8FAFC')

    days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    hours = [4.5, 6.0, 5.2, 7.5, 4.0, 8.5, 6.8]
    for i, (d, h) in enumerate(zip(days, hours)):
        bx = 67 + i * 4.2
        by = 22
        bh = h * 3.8
        ax.add_patch(patches.Rectangle((bx, by), 3, bh, fc='#38BDF8', ec='#0284C7', lw=1))
        ax.text(bx+1.5, by+bh+1.5, f'{h}h', fontsize=6.5, ha='center', color='#F8FAFC')
        ax.text(bx+1.5, by-4, d, fontsize=7, ha='center', color='#94A3B8')

    ax.plot([66, 95], [22, 22], color='#475569', lw=1)
    ax.text(80.5, 12, '14-Day Active Streak  (Goal: 5h/day)', fontsize=7.5, fontweight='bold', ha='center', color='#F59E0B')

    plt.tight_layout()
    plt.savefig('generated_media/image11.jpeg', dpi=100)
    plt.close()

# Run all
make_fig_3_1()
make_fig_3_2()
make_fig_4_1()
make_fig_4_2()
make_fig_5_1()
make_fig_b_1_1()
make_fig_b_2_1()
make_fig_b_2_2()
make_fig_b_3_1()
make_fig_b_3_2()
print('All 10 figures (image2 to image11) successfully generated!')
